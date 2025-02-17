import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateSchema = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ message: error instanceof Error ? error.message : "Invalid data" });
  }
};
