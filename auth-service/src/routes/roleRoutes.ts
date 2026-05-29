import express from "express";
import * as roleController from "../controllers/roleController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticate, authorize("ADMIN"), roleController.createRole);

router.get("/getall", authenticate, authorize("ADMIN"), roleController.getRoles);

export default router;
