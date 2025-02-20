"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validatorMiddleware_1 = require("../middlewares/validatorMiddleware");
const authSchema_1 = require("../schemas/authSchema");
const router = (0, express_1.Router)();
router.post("/register", (0, validatorMiddleware_1.validateSchema)(authSchema_1.registerSchema), authController_1.register);
router.post("/login", (0, validatorMiddleware_1.validateSchema)(authSchema_1.loginSchema), authController_1.login);
router.get("/verify", authController_1.verifyToken);
router.post("/logout", authController_1.verifyToken, authController_1.logout);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map