
import { DataTypes, Model } from "sequelize";
import db from "../db";

class Familia extends Model {
  public id!: number;
  public nombre!: string;
  public codigo_compartir!: string;
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
    codigo_compartir: {
      type: DataTypes.STRING(6),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    tableName: "familias",
    timestamps: true,
  }
);

export default Familia;
