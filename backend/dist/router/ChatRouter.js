import { Router } from "express";
import * as ChatController from "../controller/ChatController.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
export const router = Router();
router.use(authMiddleware);
router.post("/create/:id", ChatController.createChatRoom);
router.get("/my", ChatController.getMyChats);
router.get("/messages/:id", ChatController.getChatMessages);
//# sourceMappingURL=ChatRouter.js.map