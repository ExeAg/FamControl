import express , { Application } from "express";
import db from "../db";

class Server {
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port= process.env.PORT || "3000";
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log("Database online")
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log("Servidor corriendo en puerto " + this.port)
        })
    }
}
export default Server;