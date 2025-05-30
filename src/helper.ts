import prisma from "./config/db.config.js";
import { consumer, producer } from "./config/kafka.config.js";

export const produceMessage = async (topic: string, message: any) => {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
};

export const consumeMessages = async (topic: string) => {
  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());
      await prisma.chats.create({
        data: data,
      });
    },
  });
};

//https://chatgpt.com/c/6839b058-ad70-800f-b1ab-5d54f4da0395
