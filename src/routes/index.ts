import { Router } from "express";
const router = Router();
import AuthController from "../controllers/AuthController.js";
import ChatGroupController from "../controllers/GroupController.js";
import authMiddleware from "../AuthMiddleware.js";

// Auth Routes
router.post("/auth/login", AuthController.login);

//chatgroup-route
router.post("/chatgroup", authMiddleware, ChatGroupController.store);
router.get("/chatgroup",authMiddleware, ChatGroupController.index);
router.get("/chatgroup/:id",authMiddleware,ChatGroupController.show);
router.put("/chatGroup/:id", authMiddleware, ChatGroupController.update);
router.delete("/chatGroup/:id",authMiddleware, ChatGroupController.destroy);

export default router;
