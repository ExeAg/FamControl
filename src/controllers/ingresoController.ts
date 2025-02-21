import { Request, Response, NextFunction } from "express";
import Ingreso from "../models/ingreso.model";

// Obtener todos los ingresos
export const getIngresos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingresos = await Ingreso.findAll();
    res.json(ingresos);
  } catch (error) {
    next(error); 
  }
};

// Obtener un ingreso por ID
export const getIngresoById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const ingreso = await Ingreso.findByPk(id);
    if (!ingreso) return res.status(404).json({ message: "Ingreso no encontrado" });
    res.json(ingreso);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo ingreso
export const createIngreso = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevoIngreso = await Ingreso.create(req.body);
    res.status(201).json(nuevoIngreso);
  } catch (error) {
    next(error);
  }
};

// Actualizar un ingreso
export const updateIngreso = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const ingreso = await Ingreso.findByPk(id);
    if (!ingreso) return res.status(404).json({ message: "Ingreso no encontrado" });

    await ingreso.update(req.body);
    res.json(ingreso);
  } catch (error) {
    next(error);
  }
};

// Eliminar un ingreso
export const deleteIngreso = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const ingreso = await Ingreso.findByPk(id);
    if (!ingreso) return res.status(404).json({ message: "Ingreso no encontrado" });

    await ingreso.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
