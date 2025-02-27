"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Familia = exports.User = void 0;
const user_model_1 = __importDefault(require("./user.model"));
exports.User = user_model_1.default;
const familia_model_1 = __importDefault(require("./familia.model"));
exports.Familia = familia_model_1.default;
// Define la asociación: Muchos usuarios pertenecen a una familia.
familia_model_1.default.hasMany(user_model_1.default, { foreignKey: "familia_id" });
user_model_1.default.belongsTo(familia_model_1.default, { foreignKey: "familia_id" });
//# sourceMappingURL=associations.js.map