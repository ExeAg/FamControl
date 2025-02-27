"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
class Familia extends sequelize_1.Model {
}
Familia.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    codigo_compartir: {
        type: sequelize_1.DataTypes.STRING(6),
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: db_1.default,
    tableName: "familias",
    timestamps: true,
});
exports.default = Familia;
//# sourceMappingURL=familia.model.js.map