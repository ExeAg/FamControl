"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDbConnection = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Cargar variables de entorno
const db = new sequelize_1.Sequelize(process.env.DB_NAME || "ecofamily", process.env.DB_USER || "root", process.env.DB_PASSWORD || "", {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
});
const checkDbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.authenticate();
        console.log("Conexión a la base de datos exitosa.");
    }
    catch (error) {
        console.error("Error al conectar con la base de datos:", error.message);
    }
});
exports.checkDbConnection = checkDbConnection;
exports.default = db;
//# sourceMappingURL=db.js.map