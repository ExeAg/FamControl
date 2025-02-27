//src/server.ts
import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { limpiarIndices } from "./scheduler/limpiarIndices"; 
import db, { checkDbConnection } from "./db";
import User from "./models/user.model";
import Familia from "./models/familia.model";
// import Ingreso from "./models/ingreso.model";
// import Gasto from "./models/gasto.model";
// import Categoria from "./models/categoria.model";
import "./models/associations"
import authRoutes from "./routes/authRoutes";
import familiaRoutes from "./routes/familiaRoutes";
import ingresoRoutes from "./routes/ingresoRoutes";
import gastoRoutes from "./routes/gastoRoutes";
import categoriaRoutes from "./routes/categoriaRoutes";



class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "4000";
        this.app.use(morgan("dev"));
        this.middlewares();
        this.routes();
        this.dbConnection();
    }

    async dbConnection() {
        try {
            await checkDbConnection();
            console.log("Database online");
            await User.sync({ alter: true });
            console.log("Tabla 'users' sincronizada");

            await Familia.sync({ alter: true });
            console.log("Tabla 'familias' sincronizada");

            // await Ingreso.sync({ alter: true });
            // console.log("Tabla 'ingresos' sincronizada");

            // await Gasto.sync({ alter: true });
            // console.log("Tabla 'gastos' sincronizada");

            // await Categoria.sync({ alter: true });
            // console.log("Tabla 'categorias' sincronizada");

        } catch (error: any) {
            console.error("Error al conectar a la base de datos:", error.message);
        }
    }

    middlewares() {
        this.app.use(cookieParser());
        this.app.use(cors({
            origin: (origin, callback) => {
                const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5173"];
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
            credentials: true, // Permite enviar cookies (autenticación con JWT)
        }));
        this.app.use(express.json()); // Para Permitir JSON en las peticiones
    }

    routes() {
        this.app.use("/api/auth", authRoutes);
        this.app.use("/api/familias", familiaRoutes);
        this.app.use("/api/ingresos", ingresoRoutes);
        this.app.use("/api/gastos", gastoRoutes);
        this.app.use("/api/categorias", categoriaRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
            // Inicializa la limpieza de índices al arrancar el servidor
            limpiarIndices()
              .then(() => console.log("Limpieza de índices inicial completada"))
              .catch((error) => console.error("Error al limpiar índices:", error));
        });
    }
}

export default Server;
