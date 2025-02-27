import User from "./user.model";
import Familia from "./familia.model";


// Define la asociación: Muchos usuarios pertenecen a una familia.
Familia.hasMany(User, { foreignKey: "familia_id" });
User.belongsTo(Familia, { foreignKey: "familia_id" });

// Exporta los modelos para usarlos en otros módulos si es necesario.
export { User, Familia };
