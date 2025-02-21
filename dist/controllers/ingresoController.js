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
exports.deleteIngreso = exports.updateIngreso = exports.createIngreso = exports.getIngresoById = exports.getIngresos = void 0;
const ingreso_model_1 = __importDefault(require("../models/ingreso.model"));
// Obtener todos los ingresos
const getIngresos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingresos = yield ingreso_model_1.default.findAll();
        res.json(ingresos);
    }
    catch (error) {
        next(error);
    }
});
exports.getIngresos = getIngresos;
// Obtener un ingreso por ID
const getIngresoById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const ingreso = yield ingreso_model_1.default.findByPk(id);
        if (!ingreso)
            return res.status(404).json({ message: "Ingreso no encontrado" });
        res.json(ingreso);
    }
    catch (error) {
        next(error);
    }
});
exports.getIngresoById = getIngresoById;
// Crear un nuevo ingreso
const createIngreso = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevoIngreso = yield ingreso_model_1.default.create(req.body);
        res.status(201).json(nuevoIngreso);
    }
    catch (error) {
        next(error);
    }
});
exports.createIngreso = createIngreso;
// Actualizar un ingreso
const updateIngreso = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const ingreso = yield ingreso_model_1.default.findByPk(id);
        if (!ingreso)
            return res.status(404).json({ message: "Ingreso no encontrado" });
        yield ingreso.update(req.body);
        res.json(ingreso);
    }
    catch (error) {
        next(error);
    }
});
exports.updateIngreso = updateIngreso;
// Eliminar un ingreso
const deleteIngreso = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const ingreso = yield ingreso_model_1.default.findByPk(id);
        if (!ingreso)
            return res.status(404).json({ message: "Ingreso no encontrado" });
        yield ingreso.destroy();
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteIngreso = deleteIngreso;
//# sourceMappingURL=ingresoController.js.map