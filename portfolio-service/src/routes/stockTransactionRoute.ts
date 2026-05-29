import express from "express";

import {
  
  BuyStock,
  sellStock,
  getAllStockTransactions,
} from "../controllers/stockTransactionController";
import { authenticate, authorize } from "../middleware/authMiddleware";


const router = express.Router();

// router.post("/create", createStockTransaction);
router.post("/buy", authenticate, BuyStock);
router.post("/sell", authenticate, sellStock)
router.get("/get", authenticate, authorize("ADMIN"), getAllStockTransactions);

export default router;
