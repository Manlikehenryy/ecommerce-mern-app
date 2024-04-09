import express from "express";
import { addOrder, getAllOrders, updateOrder } from "../controllers/order.controller.js";
import protectRoute from '../middleware/protectRoute.js'


const router = express.Router();

router.post("/",protectRoute,addOrder);
router.get("/",protectRoute,getAllOrders);
router.put("/",protectRoute,updateOrder);




export default router;