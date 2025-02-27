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
exports.generarCodigoFamiliaUnico = void 0;
const familia_model_1 = __importDefault(require("../models/familia.model"));
function generarCodigoFamiliaUnico() {
    return __awaiter(this, void 0, void 0, function* () {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let codigo;
        let existe;
        do {
            codigo = Array.from({ length: 6 }, () => caracteres.charAt(Math.floor(Math.random() * caracteres.length))).join("");
            existe = yield familia_model_1.default.findOne({ where: { codigo_compartir: codigo } });
        } while (existe);
        return codigo;
    });
}
exports.generarCodigoFamiliaUnico = generarCodigoFamiliaUnico;
//# sourceMappingURL=generarCodigoFamilia.js.map