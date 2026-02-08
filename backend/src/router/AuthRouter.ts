import {Router} from "express"

import { login } from "../controllers/auth/login/post.js"
import { logout } from "../controllers/auth/logout/post.js";
import {register} from "../controllers/auth/register/post.js"

export const router = Router();

router.post("/login" , login);
router.post("/register" , register);
router.post("/logout" , logout);