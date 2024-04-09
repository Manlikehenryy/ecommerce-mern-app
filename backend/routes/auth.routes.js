import express from "express";
import { signIn, signOut, signUp, signUpAdmin, hasTokenExpired} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup/admin",signUpAdmin)

router.post("/signup",signUp)

router.post("/signin",signIn)

router.post("/signout",signOut)

router.get("/signout",signOut)

router.get("/hastokenexpired",hasTokenExpired)


export default router;