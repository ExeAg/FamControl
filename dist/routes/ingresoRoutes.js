"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ingresoController_1 = require("../controllers/ingresoController");
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const router = (0, express_1.Router)();
router.get("/", (0, asyncHandler_1.default)(ingresoController_1.getIngresos));
router.get("/:id", (0, asyncHandler_1.default)(ingresoController_1.getIngresoById));
router.post("/", (0, asyncHandler_1.default)(ingresoController_1.createIngreso));
router.put("/:id", (0, asyncHandler_1.default)(ingresoController_1.updateIngreso));
router.delete("/:id", (0, asyncHandler_1.default)(ingresoController_1.deleteIngreso));
exports.default = router;
//# sourceMappingURL=ingresoRoutes.js.map