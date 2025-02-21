import { Request, Response } from "express";
import Familia from "../models/familia.model";

// Obtener todas las familias (Para controlar a futuro)
export const getFamilias = async (req: Request, res: Response) => {
  try {
    const familias = await Familia.findAll();
    res.json(familias);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener familias", error });
  }
};

// Obtener una familia por ID (Para que se pueda compartir familia)
export const getFamiliaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const familia = await Familia.findByPk(id);
    if (!familia) return res.status(404).json({ message: "Familia no encontrada" });
    res.json(familia);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener familia", error });
  }
};

// Crear una nueva familia
export const createFamilia = async (req: Request, res: Response) => {
  const { nombre } = req.body;
  try {
    const nuevaFamilia = await Familia.create({ nombre });
    res.status(201).json(nuevaFamilia);
  } catch (error) {
    res.status(500).json({ message: "Error al crear familia", error });
  }
};

// Actualizar una familia
export const updateFamilia = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const familia = await Familia.findByPk(id);
    if (!familia) return res.status(404).json({ message: "Familia no encontrada" });
    
    familia.nombre = nombre;
    await familia.save();
    res.json(familia);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar familia", error });
  }
};

// Eliminar una familia
export const deleteFamilia = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const familia = await Familia.findByPk(id);
    if (!familia) return res.status(404).json({ message: "Familia no encontrada" });
    
    await familia.destroy();
    res.json({ message: "Familia eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar familia", error });
  }
};
