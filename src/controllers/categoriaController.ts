import { Request, Response, NextFunction } from "express";
import Categoria from "../models/categoria.model";

// Obtener todas las categorías
export const getCategorias = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    next(error);
  }
};

// Obtener una categoría por ID
export const getCategoriaById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);
    if (!categoria) return res.status(404).json({ message: "Categoría no encontrada" });
    res.json(categoria);
  } catch (error) {
    next(error);
  }
};

// Crear una nueva categoría
export const createCategoria = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevaCategoria = await Categoria.create(req.body);
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    next(error);
  }
};

// Actualizar una categoría
export const updateCategoria = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);
    if (!categoria) return res.status(404).json({ message: "Categoría no encontrada" });

    await categoria.update(req.body);
    res.json(categoria);
  } catch (error) {
    next(error);
  }
};

// Eliminar una categoría
export const deleteCategoria = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.findByPk(id);
    if (!categoria) return res.status(404).json({ message: "Categoría no encontrada" });

    await categoria.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
