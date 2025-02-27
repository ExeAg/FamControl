"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
//src/schemas/authSchema.ts
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(3, "El Usuario debe contener un mínimo de 3 caracteres"),
    email: zod_1.z
        .string()
        .email("Formato de email inválido"),
    password: zod_1.z
        .string()
        .min(6, "La contraseña debe contener al menos 6 caracteres"),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.
        string()
        .email("Formato de email inválido"),
    password: zod_1.z
        .string()
        .min(6, "La contraseña debe contener al menos 6 caracteres"),
});
//# sourceMappingURL=authSchema.js.map