
import { Router } from "express";
import {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../controllers/categoriaController";
import asyncHandler from "../middlewares/asyncHandler";

const router = Router();

router.get("/", asyncHandler(getCategorias));
router.get("/:id", asyncHandler(getCategoriaById));
router.post("/", asyncHandler(createCategoria));
router.put("/:id", asyncHandler(updateCategoria));
router.delete("/:id", asyncHandler(deleteCategoria));

export default router;
