import dotenv from "dotenv";
import Server from "./server";

//Configurar dotenv
dotenv.config();

const server = new Server;

server.listen();