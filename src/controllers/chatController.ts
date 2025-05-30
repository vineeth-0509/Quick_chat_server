import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import { createChat } from "../services/chat.service.js";
export class ChatController {
  static async index(req: Request, res: Response) {
    const { groupId } = req.params;
    const chats = await prisma.chats.findMany({
      where: {
        groupId: groupId,
      },
    });
    return res.json({ data: chats });
  }

  static async store(req: Request, res: Response) {
    const { message, name, groupId } = req.body;
    const chat = await createChat({ message, name, groupId });
    return res.status(201).json({ data: chat });
  }
}
