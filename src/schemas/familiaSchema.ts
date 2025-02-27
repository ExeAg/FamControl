//src/schemas/familaSchema.ts
import { z } from "zod";

export const familiaSchema = z.object({
  nombre: z
  .string()
  .min(3, "El nombre de la familia debe contener un mínimo de 3 caracteres"),

});

