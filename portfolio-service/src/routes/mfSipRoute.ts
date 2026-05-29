import express from "express";
import {createSip,deleteSip,getAllSips, getInvestedSips, getSipByPan, updateSipStatus} from "../controllers/mfSipController"
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = express.Router();
router.post("/create", authenticate, createSip);
router.get("/get", authenticate, authorize("ADMIN"), getAllSips);
router.get("/invested/:pan", authenticate, getInvestedSips)
router.get("/pan/:pan", authenticate, getSipByPan);
router.delete("/delete/:id", authenticate, authorize("ADMIN"), deleteSip)
router.patch("/:id/status", authenticate, updateSipStatus)

export default router;
