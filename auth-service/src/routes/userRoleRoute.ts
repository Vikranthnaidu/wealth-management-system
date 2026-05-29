import express from "express";
import * as userRoleController from "../controllers/userRoleController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/assign", authenticate, authorize("ADMIN"), userRoleController.assignRole);

export default router;
