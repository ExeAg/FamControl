"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const user_model_1 = __importDefault(require("./user.model"));
class Ingreso extends sequelize_1.Model {
}
Ingreso.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    monto: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "ingresos",
    timestamps: true,
});
Ingreso.belongsTo(user_model_1.default, { foreignKey: "userId", onDelete: "CASCADE" });
user_model_1.default.hasMany(Ingreso, { foreignKey: "userId" });
exports.default = Ingreso;
//# sourceMappingURL=ingreso.model.js.map