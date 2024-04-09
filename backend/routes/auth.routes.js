import express from "express";
import { signIn, signOut, signUp, signUpAdmin, hasTokenExpired, fetchPaystackKey} from "../controllers/auth.controller.js";
import protectRoute from '../middleware/protectRoute.js'

const router = express.Router();

router.post("/signup/admin",signUpAdmin)

router.post("/signup",signUp)

router.post("/signin",signIn)

router.post("/signout",signOut)

router.get("/signout",signOut)

router.get("/hastokenexpired",hasTokenExpired)

router.get("/paystackkey",protectRoute,fetchPaystackKey)


export default router;