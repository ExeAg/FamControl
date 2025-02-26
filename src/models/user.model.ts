//src/models/user.model.ts
import { DataTypes, Model } from "sequelize";
import db from "../db";

class User extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El nombre de usuario es obligatorio",
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "El correo electrónico no es válido",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db, // Conexión a la base de datos
        tableName: "users",
        timestamps: true, // Crea automáticamente createdAt y updatedAt
    }
);

export default User;
