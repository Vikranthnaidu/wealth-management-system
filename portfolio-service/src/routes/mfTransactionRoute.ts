import express from "express";

import {
  createTransaction,
  getAllTransactions,
  getNetInvestment,
} from "../controllers/mfTransactionController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticate, createTransaction);

router.get("/get", authenticate, authorize("ADMIN"), getAllTransactions);

router.get("/net-investment/:pan", authenticate, getNetInvestment)
export default router;
