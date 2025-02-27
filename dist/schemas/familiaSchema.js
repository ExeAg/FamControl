"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.familiaSchema = void 0;
//src/schemas/familaSchema.ts
const zod_1 = require("zod");
exports.familiaSchema = zod_1.z.object({
    nombre: zod_1.z
        .string()
        .min(3, "El nombre de la familia debe contener un mínimo de 3 caracteres"),
});
//# sourceMappingURL=familiaSchema.js.map