import { Socket, Server } from "socket.io";
import prisma from "./config/db.config.js";
import { produceMessage } from "./helper.js";
import { createChat } from "./services/chat.service.js";

interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    if (!room) {
      return next(new Error("Invalid room"));
    }
    socket.room = room;
    next();
  });
  io.on("connection", (socket: CustomSocket) => {
    //join the room
    socket.join(socket.room);
    // console.log("The socket connected...", socket.id);

    socket.on("message",async  (data) => {


      //sending to the kafka producer
      await produceMessage(process.env.KAFKA_TOPIC, data);
      //this is to broadcast to the every user rather than the original send.
      // socket.broadcast.emit("message", data);

      //storing the messages in the database
      const {name, groupId, message} = data;
      const savedChat = await createChat({name,groupId, message});
      await prisma.chats.create({
        data:data
      })

      //this is sending the message to the groups/room
      socket.to(socket.room).emit("message", savedChat);
    });
    socket.on("disconnect", () => {
      console.log("A suser is disconnected:", socket.id);
    });
  });
}
