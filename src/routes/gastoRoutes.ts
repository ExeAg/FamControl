import { Router } from "express";
import {
  getGastos,
  getGastoById,
  createGasto,
  updateGasto,
  deleteGasto,
} from "../controllers/gastoController";
import asyncHandler from "../middlewares/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getGastos));
router.get("/:id", asyncHandler(getGastoById));
router.post("/", asyncHandler(createGasto));
router.put("/:id", asyncHandler(updateGasto));
router.delete("/:id", asyncHandler(deleteGasto));

export default router;