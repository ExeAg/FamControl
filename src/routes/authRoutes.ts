import { Router } from "express";
import { login, logout, register, verifyToken } from "../controllers/authController";
import { validateSchema } from "../middlewares/validatorMiddleware";
import { loginSchema, registerSchema } from "../schemas/authSchema";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);

export default router;
