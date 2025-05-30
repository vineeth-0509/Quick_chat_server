import { Request, Response } from "express";
import prisma from "../config/db.config.js";

interface GroupUserType {
  name: string;
  groupId: string;
}
export class ChatGroupUserController {
  static async index(req: Request, res: Response) {
    try {
      const { groupId } = req.query;
      const users = await prisma.groupUsers.findMany({
        where: {
          groupId: groupId as string,
        },
      });
      return res.json({ message: "Data fetched successfully", data: users });
    } catch (error) {
      return res.status(500).json({ message: "Error in ChatGroupUserIndex" });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const body: GroupUserType = req.body;
      if (!body.name || !body.groupId) {
        return res
          .status(400)
          .json({ message: "Name and groupId are required" });
      }
      const user = await prisma.groupUsers.create({
        data: {
          name: body.name,
          group: {
            connect: { id: body.groupId },
          },
        },
      });
      return res.json({ message: "User created successfully!", data: user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again!" });
    }
  }
}
