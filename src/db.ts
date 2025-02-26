//db.ts

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno

const db = new Sequelize(
    process.env.DB_NAME || "ecofamily",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        logging: false,
    }
);

export const checkDbConnection = async () => {
    try {
        await db.authenticate();
        console.log("Conexión a la base de datos exitosa.");
    } catch (error: any) {
        console.error("Error al conectar con la base de datos:", error.message);
    }
};

export default db;