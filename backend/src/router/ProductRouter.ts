import {Router} from "express"
import * as ProductController from "../controller/ProductController.js";
import {authMiddleware} from "../middleware/AuthMiddleware.js";
import {upload} from "../middleware/UploadImageMiddleware.js";

export const router = Router();

router.use(authMiddleware);
router.get("/list" , ProductController.getProducts);
router.get("/list/my" , ProductController.getMyProducts);
router.get("/:id" , ProductController.getProduct);
router.post("/create" ,  upload.single("image") , ProductController.createProduct);
router.post("/delete/:id" , ProductController.removeProduct);
router.post("/update/:id" ,  upload.single("image"),  ProductController.updateProduct);
router.post("/like/:id" , ProductController.likeProduct);