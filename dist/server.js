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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./db"));
const user_model_1 = __importDefault(require("./models/user.model"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes")); // Importar las rutas de autenticación
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        this.app.use((0, morgan_1.default)("dev"));
        this.middlewares(); // Agregar middlewares
        this.routes(); // Agregar rutas
        this.dbConnection();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.default.authenticate();
                console.log("Database online");
                yield user_model_1.default.sync({ alter: true }); // alter actualiza la tabla según el modelo
                console.log("Tabla 'users' sincronizada");
            }
            catch (error) {
                console.error("Error al conectar a la base de datos:", error.message);
            }
        });
    }
    middlewares() {
        this.app.use(express_1.default.json()); // Permitir JSON en las peticiones
    }
    routes() {
        this.app.use("/api/auth", authRoutes_1.default); // Registrar rutas
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map