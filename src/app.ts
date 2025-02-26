//src/app.ts
import express from "express";
import dotenv from "dotenv";
import Server from "./server";
import cors from "cors";


//Configurar dotenv
dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

const server = new Server;

server.listen();