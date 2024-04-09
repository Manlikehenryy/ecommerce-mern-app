import express from "express";
import { addToCart, deleteItemFromCart, getAllCartItems, getAllCartItemDetails} from "../controllers/cart.controller.js";
import protectRoute from '../middleware/protectRoute.js'


const router = express.Router();

router.post("/",protectRoute,addToCart);
router.delete("/:id",protectRoute,deleteItemFromCart);
router.get("/",protectRoute,getAllCartItems);
router.get("/getAllCartItemDetails",protectRoute,getAllCartItemDetails);


export default router;