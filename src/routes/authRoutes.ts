
import { Router } from "express";
import { login, logout, register, verifyToken } from "../controllers/authController";
import { validateSchema } from "../middlewares/validatorMiddleware";
import { loginSchema, registerSchema } from "../schemas/authSchema";

const router = Router();

router.post("/register", validateSchema(registerSchema), register as any);
router.post("/login", validateSchema(loginSchema), login as any);
router.get("/verify", verifyToken as any);
router.post("/logout", verifyToken as any, logout as any);

export default router;
