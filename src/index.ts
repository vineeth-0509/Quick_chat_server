import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
const app: Application = express();
const PORT = process.env.PORT || 7000;
import Routes from "./routes/index.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.config.js";
import { instrument } from "@socket.io/admin-ui";
import { connectkafkaProducer } from "./config/kafka.config.js";
import { consumeMessages } from "./helper.js";
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://admin.socket.io",
      "https://vineeth_Quick_chat.vercel.app",
    ],
    credentials: true,
  },
  adapter: createAdapter(redis),
});

instrument(io, {
  auth: false,
  mode: "development",
});
setupSocket(io);
export { io };

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working Guys 🙌");
});

// * Routes
app.use("/api", Routes);
connectkafkaProducer().catch((err) =>
  console.log(`something went wrong while connecting kafka...`)
);
consumeMessages(process.env.KAFKA_TOPIC).catch((err) =>
  console.log("The consumer error is:", err)
);

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

//https://chatgpt.com/share/68387d45-65f4-800f-94ac-a808fc18d51f
