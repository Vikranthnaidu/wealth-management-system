import express from "express";

import {
  createNavHistory,
  getAllNavHistory,
} from "../controllers/mfNavHistoryController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticate, authorize("ADMIN"), createNavHistory);

router.get("/get", authenticate, getAllNavHistory);

export default router;
