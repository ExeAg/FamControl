import {Sequelize} from "sequelize";
const db = new Sequelize ("ecofamily","root","qwio6243",{
    host: "localhost",
    dialect: "mysql",
});

export default db;