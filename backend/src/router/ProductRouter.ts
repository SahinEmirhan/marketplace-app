import {Router} from "express"

import {authMiddleware} from "../middleware/AuthMiddleware.js";
import {upload} from "../middleware/UploadImageMiddleware.js";
import { findProductsNotOwnedByOwnerId } from "../controllers/product/list/get.js";
import { findProduct } from "../controllers/product/index/get.js";
import { findProductsOwnedByOwnerId } from "../controllers/product/list/my/get.js";
import { createProduct } from "../controllers/product/create/post.js";
import { deleteProduct } from "../controllers/product/delete/post.js";
import { updateProduct } from "../controllers/product/update/post.js";
import { likeProduct } from "../controllers/product/like/post.js";


export const router = Router();

router.use(authMiddleware);
router.get("/list" , findProductsNotOwnedByOwnerId);
router.get("/list/my" , findProductsOwnedByOwnerId);
router.get("/:id" , findProduct);
router.post("/create" ,  upload.single("image") , createProduct);
router.post("/delete/:id" , deleteProduct);
router.post("/update/:id" ,  upload.single("image"),  updateProduct);
router.post("/like/:id" , likeProduct);