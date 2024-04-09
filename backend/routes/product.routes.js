import express from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import protectRoute from '../middleware/protectRoute.js'
import isAdmin from '../middleware/isAdmin.js'
import { upload } from "../utils/uploadFile.js";

const router = express.Router();

router.post("/",protectRoute,isAdmin,upload.single('productImage'),addProduct);
router.put("/:id",protectRoute,isAdmin,upload.single('productImage'),updateProduct);
router.delete("/:id",protectRoute,isAdmin,deleteProduct);
router.get("/",getAllProducts);
router.get("/:id",getProductById);


export default router;