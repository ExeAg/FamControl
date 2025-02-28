"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriaController_1 = require("../controllers/categoriaController");
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const router = (0, express_1.Router)();
router.get("/", (0, asyncHandler_1.default)(categoriaController_1.getCategorias));
router.get("/:id", (0, asyncHandler_1.default)(categoriaController_1.getCategoriaById));
router.post("/", (0, asyncHandler_1.default)(categoriaController_1.createCategoria));
router.put("/:id", (0, asyncHandler_1.default)(categoriaController_1.updateCategoria));
router.delete("/:id", (0, asyncHandler_1.default)(categoriaController_1.deleteCategoria));
exports.default = router;
//# sourceMappingURL=categoriaRoutes.js.map