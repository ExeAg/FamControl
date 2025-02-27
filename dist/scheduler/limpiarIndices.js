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
exports.limpiarIndices = void 0;
const db_1 = __importDefault(require("../db")); // Asegúrate de que la ruta es correcta
function limpiarIndices() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield db_1.default.query(`
      SELECT INDEX_NAME AS index_name
      FROM information_schema.statistics
      WHERE table_schema = DATABASE() 
        AND table_name = 'users'
        AND INDEX_NAME NOT IN ('PRIMARY', 'unique_email')
    `);
            const indexRows = results;
            for (const row of indexRows) {
                yield db_1.default.query(`DROP INDEX \`${row.index_name}\` ON users`);
                console.log(`Índice ${row.index_name} eliminado`);
            }
        }
        catch (error) {
            console.error("Error al limpiar los índices:", error);
        }
    });
}
exports.limpiarIndices = limpiarIndices;
// El setInterval ya está configurado en este archivo para ejecutarse cada 24 horas:
setInterval(limpiarIndices, 24 * 60 * 60 * 1000);
//# sourceMappingURL=limpiarIndices.js.map