import { DataTypes, Model } from "sequelize";
import db from "../db";

class Familia extends Model {
  public id!: number;
  public nombre!: string;
}

Familia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "familias",
    timestamps: true,
  }
);

export default Familia;
