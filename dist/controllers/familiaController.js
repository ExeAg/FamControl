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
exports.deleteFamilia = exports.updateFamilia = exports.createFamilia = exports.getFamiliaById = exports.getFamilias = void 0;
const familia_model_1 = __importDefault(require("../models/familia.model"));
// Obtener todas las familias (Para controlar a futuro)
const getFamilias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const familias = yield familia_model_1.default.findAll();
        res.json(familias);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener familias", error });
    }
});
exports.getFamilias = getFamilias;
// Obtener una familia por ID (Para que se pueda compartir familia)
const getFamiliaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const familia = yield familia_model_1.default.findByPk(id);
        if (!familia)
            return res.status(404).json({ message: "Familia no encontrada" });
        res.json(familia);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener familia", error });
    }
});
exports.getFamiliaById = getFamiliaById;
// Crear una nueva familia
const createFamilia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    try {
        const nuevaFamilia = yield familia_model_1.default.create({ nombre });
        res.status(201).json(nuevaFamilia);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear familia", error });
    }
});
exports.createFamilia = createFamilia;
// Actualizar una familia
const updateFamilia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const familia = yield familia_model_1.default.findByPk(id);
        if (!familia)
            return res.status(404).json({ message: "Familia no encontrada" });
        familia.nombre = nombre;
        yield familia.save();
        res.json(familia);
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar familia", error });
    }
});
exports.updateFamilia = updateFamilia;
// Eliminar una familia
const deleteFamilia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const familia = yield familia_model_1.default.findByPk(id);
        if (!familia)
            return res.status(404).json({ message: "Familia no encontrada" });
        yield familia.destroy();
        res.json({ message: "Familia eliminada" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar familia", error });
    }
});
exports.deleteFamilia = deleteFamilia;
//# sourceMappingURL=familiaController.js.map