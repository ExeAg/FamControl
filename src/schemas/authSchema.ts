
import { z } from "zod";

export const registerSchema = z.object({
  username: z
  .string()
  .min(3, "El Usuario debe contener un mínimo de 3 caracteres"),
  nombre: z
  .string()
  .min(3, "El nombre debe contener un mínimo de 3 caracteres"),
  email: z
  .string()
  .email("Formato de email inválido"),
  password: z
  .string()
  .min(6, "La contraseña debe contener al menos 6 caracteres"),
});

export const loginSchema = z.object({
  email: z.
  string()
  .email("Formato de email inválido"),
  password: z
  .string()
  .min(6, "La contraseña debe contener al menos 6 caracteres"),
});
