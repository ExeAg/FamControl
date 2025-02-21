import { DataTypes, Model } from "sequelize";
import db from "../db";

class Categoria extends Model {
  public id!: number;
  public nombre!: string;
}

Categoria.init(
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
    tableName: "categorias",
    timestamps: true,
  }
);

export default Categoria;
