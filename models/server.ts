import express , { Application, application } from "express";


class Server {
    private app: Application

    constructor(){
        this.app = express();
    }
}