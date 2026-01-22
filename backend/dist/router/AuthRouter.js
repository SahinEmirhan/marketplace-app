import { Router } from "express";
import * as AuthController from "../controller/AuthController.js";
export const router = Router();
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
//# sourceMappingURL=AuthRouter.js.map