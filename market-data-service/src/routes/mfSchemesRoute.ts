import express from "express";
import {
  createMfScheme,
  deleteMfScheme,
  getAllMfSchemes,
  getMfSchemeByCode,
  updateMfScheme,
} from "../controllers/mfSchemesController";
import { authenticate, authorize } from "../middleware/authMiddleware";
const router = express.Router();

router.post("/create", authenticate, authorize("ADMIN"), createMfScheme);
router.get("/get", authenticate, getAllMfSchemes);
router.get("/:scheme_code", authenticate, getMfSchemeByCode);
router.put("/:scheme_code", authenticate, authorize("ADMIN"), updateMfScheme);
router.delete("/:scheme_code", authenticate, authorize("ADMIN"), deleteMfScheme);

export default router;
