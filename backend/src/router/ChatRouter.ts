import {Router} from "express"

import {authMiddleware} from "../middleware/AuthMiddleware.js";
import {createChatRoom} from "../controllers/chat/create/post.js"
import { findMyChats } from "../controllers/chat/list/my/get.js";
import { findChatMessages } from "../controllers/chat/list/messages/get.js";

export const router = Router();

router.use(authMiddleware);

router.post("/create/:id", createChatRoom);
router.get("/list/my", findMyChats);
router.get("/list/messages/:id" , findChatMessages);