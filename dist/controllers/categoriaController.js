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
exports.deleteCategoria = exports.updateCategoria = exports.createCategoria = exports.getCategoriaById = exports.getCategorias = void 0;
const categoria_model_1 = __importDefault(require("../models/categoria.model"));
// Obtener todas las categorías
const getCategorias = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorias = yield categoria_model_1.default.findAll();
        res.json(categorias);
    }
    catch (error) {
        next(error);
    }
});
exports.getCategorias = getCategorias;
// Obtener una categoría por ID
const getCategoriaById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categoria = yield categoria_model_1.default.findByPk(id);
        if (!categoria)
            return res.status(404).json({ message: "Categoría no encontrada" });
        res.json(categoria);
    }
    catch (error) {
        next(error);
    }
});
exports.getCategoriaById = getCategoriaById;
// Crear una nueva categoría
const createCategoria = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevaCategoria = yield categoria_model_1.default.create(req.body);
        res.status(201).json(nuevaCategoria);
    }
    catch (error) {
        next(error);
    }
});
exports.createCategoria = createCategoria;
// Actualizar una categoría
const updateCategoria = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categoria = yield categoria_model_1.default.findByPk(id);
        if (!categoria)
            return res.status(404).json({ message: "Categoría no encontrada" });
        yield categoria.update(req.body);
        res.json(categoria);
    }
    catch (error) {
        next(error);
    }
});
exports.updateCategoria = updateCategoria;
// Eliminar una categoría
const deleteCategoria = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categoria = yield categoria_model_1.default.findByPk(id);
        if (!categoria)
            return res.status(404).json({ message: "Categoría no encontrada" });
        yield categoria.destroy();
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCategoria = deleteCategoria;
//# sourceMappingURL=categoriaController.js.map