import { DataTypes, Model } from "sequelize";
import db from "../db";
import User from "./user.model";

class Ingreso extends Model {
  public id!: number;
  public monto!: number;
  public descripcion?: string;
  public userId!: number;
  public fecha!: Date;
}

Ingreso.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "ingresos",
    timestamps: true,
  }
);

Ingreso.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Ingreso, { foreignKey: "userId" });

export default Ingreso;
