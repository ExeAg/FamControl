"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const familiaController_1 = require("../controllers/familiaController");
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const router = (0, express_1.Router)();
router.get("/familia", (0, asyncHandler_1.default)(familiaController_1.getFamilias));
router.get("/familia/:id", (0, asyncHandler_1.default)(familiaController_1.getFamiliaById));
router.post("/familia", (0, asyncHandler_1.default)(familiaController_1.createFamilia));
router.put("/familia/:id", (0, asyncHandler_1.default)(familiaController_1.updateFamilia));
router.delete("/familia/:id", (0, asyncHandler_1.default)(familiaController_1.deleteFamilia));
exports.default = router;
//# sourceMappingURL=familiaRoutes.js.map