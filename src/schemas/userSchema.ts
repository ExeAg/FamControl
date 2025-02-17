import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "El nombre de usuario es obligatorio",
    })
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    }),
  email: z
    .string({
      required_error: "El correo electrónico es obligatorio",
    })
    .email({
      message: "El formato del correo electrónico no es válido",
    }),
  password: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El correo electrónico es obligatorio",
    })
    .email({
      message: "El formato del correo electrónico no es válido",
    }),
  password: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),
});
