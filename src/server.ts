import express, { Application } from "express";
import morgan from "morgan";
import db from "./db";
import User from "./models/user.model";
import authRoutes from "./routes/authRoutes";
import familiaRoutes from "./routes/familiaRoutes";

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3000";
        this.app.use(morgan("dev"));
        this.middlewares(); 
        this.routes(); 
        this.dbConnection();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log("Database online");
            await User.sync({ alter: true }); 
            console.log("Tabla 'users' sincronizada");
        } catch (error: any) {
            console.error("Error al conectar a la base de datos:", error.message);
        }
    }

    middlewares() {
        this.app.use(express.json()); // Para Permitir JSON en las peticiones
    }

    routes() {
        this.app.use("/api/auth", authRoutes);
        this.app.use("/api/familias", familiaRoutes); 
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port);
        });
    }
}

export default Server;
