import { Router } from "express";
import {
  getIngresos,
  getIngresoById,
  createIngreso,
  updateIngreso,
  deleteIngreso,
} from "../controllers/ingresoController";
import asyncHandler from "../middlewares/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getIngresos));
router.get("/:id", asyncHandler(getIngresoById));
router.post("/", asyncHandler(createIngreso));
router.put("/:id", asyncHandler(updateIngreso));
router.delete("/:id", asyncHandler(deleteIngreso));

export default router;
