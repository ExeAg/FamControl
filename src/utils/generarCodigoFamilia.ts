import Familia from "../models/familia.model";

export async function generarCodigoFamiliaUnico(): Promise<string> {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let codigo: string;
    let existe: Familia | null;

    do {
        codigo = Array.from({ length: 6 }, () =>
            caracteres.charAt(Math.floor(Math.random() * caracteres.length))
        ).join("");
        existe = await Familia.findOne({ where: { codigo_compartir: codigo } });
    } while (existe);

    return codigo;
}
