import db from "../db"; // Asegúrate de que la ruta es correcta

interface IndexRow {
  index_name: string;
}

export async function limpiarIndices(): Promise<void> {
  try {
    const [results] = await db.query(`
      SELECT INDEX_NAME AS index_name
      FROM information_schema.statistics
      WHERE table_schema = DATABASE() 
        AND table_name = 'users'
        AND INDEX_NAME NOT IN ('PRIMARY', 'unique_email')
    `);

    const indexRows = results as IndexRow[];

    for (const row of indexRows) {
      await db.query(`DROP INDEX \`${row.index_name}\` ON users`);
      console.log(`Índice ${row.index_name} eliminado`);
    }
  } catch (error) {
    console.error("Error al limpiar los índices:", error);
  }
}

// El setInterval ya está configurado en este archivo para ejecutarse cada 24 horas:
setInterval(limpiarIndices, 24 * 60 * 60 * 1000);
