"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gastoController_1 = require("../controllers/gastoController");
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const router = (0, express_1.Router)();
router.get("/", (0, asyncHandler_1.default)(gastoController_1.getGastos));
router.get("/:id", (0, asyncHandler_1.default)(gastoController_1.getGastoById));
router.post("/", (0, asyncHandler_1.default)(gastoController_1.createGasto));
router.put("/:id", (0, asyncHandler_1.default)(gastoController_1.updateGasto));
router.delete("/:id", (0, asyncHandler_1.default)(gastoController_1.deleteGasto));
exports.default = router;
//# sourceMappingURL=gastoRoutes.js.map