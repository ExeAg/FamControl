import { z } from "zod";

export const familiaSchema = z.object({
  nombre: z.string().min(3, { message: "El nombre de la familia debe tener al menos 3 caracteres" }),
});