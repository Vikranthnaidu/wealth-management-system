import express from "express";
import * as userLoginController from "../controllers/userLoginController";

const router = express.Router();

router.post("/register", userLoginController.registerUser);
router.post("/login", userLoginController.loginUser);
router.get("/verify", userLoginController.verifyUser);

export default router;
