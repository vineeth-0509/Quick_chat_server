import { Request, Response } from "express";
import prisma from "../config/db.config.js";
class ChatGroupController {
  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const group = await prisma.chatGroup.findUnique({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ message: "Chat Group fetched successfully!", data: group });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong in the fetching the group details",
      });
    }
  }
  static async index(req: Request, res: Response) {
    try {
      const user = req.user;
      const groups = await prisma.chatGroup.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.json({
        message: "chat groups fetched successfully",
        data: groups,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong in fetching the chat groups" });
    }
  }
  static async store(req: Request, res: Response) {
    try {
      const body = req.body;
      const user = req.user;
      await prisma.chatGroup.create({
        data: {
          title: body.title,
          passcode: body.passcode,
          userId: user.id,
        },
      });
      return res.json({ message: "Chat Group created Successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong: please try again" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;
      const result = await prisma.chatGroup.update({
        data: {
          title: body.title,
          passcode: body.passcode,
        },
        where: {
          id: id,
        },
      });
      return res.status(200).json({
        message: "ChatGroup updated Successfully with title and passcode!",
        data: result,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong in chatgroup updating!" });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.chatGroup.delete({
        where: {
          id: id,
        },
      });
      return res
        .status(200)
        .json({ message: "chatGroup deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong in delete the chatGroup" });
    }
  }
}

export default ChatGroupController;
