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
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const limpiarIndices_1 = require("./scheduler/limpiarIndices");
const db_1 = require("./db");
const user_model_1 = __importDefault(require("./models/user.model"));
const familia_model_1 = __importDefault(require("./models/familia.model"));
// import Ingreso from "./models/ingreso.model";
// import Gasto from "./models/gasto.model";
// import Categoria from "./models/categoria.model";
require("./models/associations");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const familiaRoutes_1 = __importDefault(require("./routes/familiaRoutes"));
const ingresoRoutes_1 = __importDefault(require("./routes/ingresoRoutes"));
const gastoRoutes_1 = __importDefault(require("./routes/gastoRoutes"));
const categoriaRoutes_1 = __importDefault(require("./routes/categoriaRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "4000";
        this.app.use((0, morgan_1.default)("dev"));
        this.middlewares();
        this.routes();
        this.dbConnection();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, db_1.checkDbConnection)();
                console.log("Database online");
                yield user_model_1.default.sync({ alter: true });
                console.log("Tabla 'users' sincronizada");
                yield familia_model_1.default.sync({ alter: true });
                console.log("Tabla 'familias' sincronizada");
                // await Ingreso.sync({ alter: true });
                // console.log("Tabla 'ingresos' sincronizada");
                // await Gasto.sync({ alter: true });
                // console.log("Tabla 'gastos' sincronizada");
                // await Categoria.sync({ alter: true });
                // console.log("Tabla 'categorias' sincronizada");
            }
            catch (error) {
                console.error("Error al conectar a la base de datos:", error.message);
            }
        });
    }
    middlewares() {
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, cors_1.default)({
            origin: (origin, callback) => {
                const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5173"];
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                }
                else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
            credentials: true, // Permite enviar cookies (autenticación con JWT)
        }));
        this.app.use(express_1.default.json()); // Para Permitir JSON en las peticiones
    }
    routes() {
        this.app.use("/api/auth", authRoutes_1.default);
        this.app.use("/api/familias", familiaRoutes_1.default);
        this.app.use("/api/ingresos", ingresoRoutes_1.default);
        this.app.use("/api/gastos", gastoRoutes_1.default);
        this.app.use("/api/categorias", categoriaRoutes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
            // Inicializa la limpieza de índices al arrancar el servidor
            (0, limpiarIndices_1.limpiarIndices)()
                .then(() => console.log("Limpieza de índices inicial completada"))
                .catch((error) => console.error("Error al limpiar índices:", error));
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map