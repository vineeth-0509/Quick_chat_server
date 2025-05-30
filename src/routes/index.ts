import { Router } from "express";
const router = Router();
import AuthController from "../controllers/AuthController.js";
import ChatGroupController from "../controllers/GroupController.js";
import authMiddleware from "../AuthMiddleware.js";
import { ChatGroupUserController } from "../controllers/ChatGroupUserController.js";
import { ChatController } from "../controllers/chatController.js";

// Auth Routes
router.post("/auth/login", AuthController.login);

//chatgroup-route
router.post("/chatgroup", authMiddleware, ChatGroupController.store);
router.get("/chatgroup", authMiddleware, ChatGroupController.index);
router.get("/chatgroup/:id", ChatGroupController.show);
router.put("/chatGroup/:id", authMiddleware, ChatGroupController.update);
router.delete("/chatGroup/:id", authMiddleware, ChatGroupController.destroy);

//chat-group users
router.get("/chatgroup-users", ChatGroupUserController.index);
router.post("/chatgroup-users", ChatGroupUserController.store);

//chat-messages
router.get("/chats/:groupId", ChatController.index);
export default router;
