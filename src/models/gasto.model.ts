import { DataTypes, Model } from "sequelize";
import db from "../db";
import User from "./user.model";
import Categoria from "./categoria.model";

class Gasto extends Model {
  public id!: number;
  public monto!: number;
  public descripcion?: string;
  public userId!: number;
  public categoryId?: number;
  public fecha!: Date;
}

Gasto.init(
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
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "gastos",
    timestamps: true,
  }
);

Gasto.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Gasto, { foreignKey: "userId" });

Gasto.belongsTo(Categoria, { foreignKey: "categoryId", onDelete: "SET NULL" });
Categoria.hasMany(Gasto, { foreignKey: "categoryId" });

export default Gasto;
