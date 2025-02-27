import { Router } from "express";
import {
  getFamilias,
  getFamiliaById,
  createFamilia,
  updateFamilia,
  deleteFamilia,
} from "../controllers/familiaController";
import asyncHandler from "../middlewares/asyncHandler";

const router = Router();

router.get("/familia", asyncHandler(getFamilias));
router.get("/familia/:id", asyncHandler(getFamiliaById));
router.post("/familia", asyncHandler(createFamilia));
router.put("/familia/:id", asyncHandler(updateFamilia));
router.delete("/familia/:id", asyncHandler(deleteFamilia));

export default router;
