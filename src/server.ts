import express, { Application } from "express";
import morgan from "morgan";
import db from "./db";
import User from "./models/user.model";

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3000";
        this.app.use(morgan("dev"));
        this.dbConnection();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log("Database online");
            await User.sync({ alter: true }); // alter actualiza la tabla según el modelo
            console.log("Tabla 'users' sincronizada");
        } catch (error: any) {
            console.error("Error al conectar a la base de datos:", error.message);
        }
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port)
        })
    }
}
export default Server;