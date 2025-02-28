
import { DataTypes, Model } from "sequelize";
import db from "../db";

class User extends Model {
    public id!: number;
    public username!: string;
    public nombre!: string; 
    public email!: string;
    public password!: string;
    public familia_id!: number | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El nombre es obligatorio",
                },
            },
        },
        familia_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
              model: 'familias', // O el nombre de la tabla familia
              key: 'id'
            }
          }
    },
    {
        sequelize: db, // Conexión a la base de datos
        tableName: "users",
        timestamps: true, // Crea automáticamente createdAt y updatedAt
    }
);

export default User;
