"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.errors.map((e) => e.message) });
    }
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validatorMiddleware.js.map