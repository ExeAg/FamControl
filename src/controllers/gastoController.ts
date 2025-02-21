import { Request, Response } from "express";
import Gasto from "../models/gasto.model";

// Obtener todos los gastos
export const getGastos = async (req: Request, res: Response) => {
    try {
      const gastos = await Gasto.findAll();
      res.json(gastos);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener ingresos", error });
    }
  };
  
  // Obtener un gasto por ID
  export const getGastoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const gasto = await Gasto.findByPk(id);
      if (!gasto) return res.status(404).json({ message: "Ingreso no encontrado" });
      res.json(gasto);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener ingreso", error });
    }
  };
  
  // Crear un nuevo ingreso
  export const createGasto = async (req: Request, res: Response) => {
    const { monto, descripcion, userId, fecha } = req.body;
    try {
      const nuevoGasto = await Gasto.create({ monto, descripcion, userId, fecha });
      res.status(201).json(nuevoGasto);
    } catch (error) {
      res.status(500).json({ message: "Error al crear ingreso", error });
    }
  };
  
  // Actualizar un gasto
  export const updateGasto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { monto, descripcion, fecha } = req.body;
    try {
      const gasto = await Gasto.findByPk(id);
      if (!gasto) return res.status(404).json({ message: "Ingreso no encontrado" });
      
      gasto.monto = monto;
      gasto.descripcion = descripcion;
      gasto.fecha = fecha;
      await gasto.save();
      res.json(gasto);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar ingreso", error });
    }
  };
  
  // Eliminar un gasto
  export const deleteGasto = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const gasto = await Gasto.findByPk(id);
      if (!gasto) return res.status(404).json({ message: "Gasto no encontrado" });
      
      await gasto.destroy();
      res.json({ message: "Gasto eliminado" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar gasto", error });
    }
  };