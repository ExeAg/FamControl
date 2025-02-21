import { Request } from "express";
import { UserInstance } from "./models/user.model"; // Ajusta la importación según la ubicación real del modelo

declare module "express-serve-static-core" {
  interface Request {
    user?: UserInstance; // Aquí aseguramos que `user` puede estar en `req`
  }
}