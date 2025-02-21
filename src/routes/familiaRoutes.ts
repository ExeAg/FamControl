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

router.get("/", asyncHandler(getFamilias));
router.get("/:id", asyncHandler(getFamiliaById));
router.post("/", asyncHandler(createFamilia));
router.put("/:id", asyncHandler(updateFamilia));
router.delete("/:id", asyncHandler(deleteFamilia));

export default router;
