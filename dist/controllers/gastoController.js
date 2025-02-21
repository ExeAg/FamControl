"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGasto = exports.updateGasto = exports.createGasto = exports.getGastoById = exports.getGastos = void 0;
const gasto_model_1 = __importDefault(require("../models/gasto.model"));
// Obtener todos los gastos
const getGastos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gastos = yield gasto_model_1.default.findAll();
        res.json(gastos);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener ingresos", error });
    }
});
exports.getGastos = getGastos;
// Obtener un gasto por ID
const getGastoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const gasto = yield gasto_model_1.default.findByPk(id);
        if (!gasto)
            return res.status(404).json({ message: "Ingreso no encontrado" });
        res.json(gasto);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener ingreso", error });
    }
});
exports.getGastoById = getGastoById;
// Crear un nuevo ingreso
const createGasto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { monto, descripcion, userId, fecha } = req.body;
    try {
        const nuevoGasto = yield gasto_model_1.default.create({ monto, descripcion, userId, fecha });
        res.status(201).json(nuevoGasto);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear ingreso", error });
    }
});
exports.createGasto = createGasto;
// Actualizar un gasto
const updateGasto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { monto, descripcion, fecha } = req.body;
    try {
        const gasto = yield gasto_model_1.default.findByPk(id);
        if (!gasto)
            return res.status(404).json({ message: "Ingreso no encontrado" });
        gasto.monto = monto;
        gasto.descripcion = descripcion;
        gasto.fecha = fecha;
        yield gasto.save();
        res.json(gasto);
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar ingreso", error });
    }
});
exports.updateGasto = updateGasto;
// Eliminar un gasto
const deleteGasto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const gasto = yield gasto_model_1.default.findByPk(id);
        if (!gasto)
            return res.status(404).json({ message: "Gasto no encontrado" });
        yield gasto.destroy();
        res.json({ message: "Gasto eliminado" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar gasto", error });
    }
});
exports.deleteGasto = deleteGasto;
//# sourceMappingURL=gastoController.js.map