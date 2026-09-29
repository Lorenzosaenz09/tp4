import { createCancion, updateCancion, deleteCancion as deleteCancionById } from '../services/cancionesService.js';

const MAX_NOMBRE = 255;

function nombreValido(nombre) {
    return typeof nombre === 'string' && nombre.trim() !== '' && nombre.length <= MAX_NOMBRE;
}

function idValido(id) {
    return Number.isInteger(Number(id)) && Number(id) > 0;
}

export async function postCancion(req, res) {
    const { nombre } = req.body;
    if (!nombreValido(nombre)) {
        return res.status(400).json({message: "Debes enviar un nombre válido"});
    }
    try {
        const result = await createCancion(nombre.trim());

        return res.status(201).send(result.rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

export async function putCancion(req, res) {
    const { id, nombre } = req.body;
    if (!idValido(id) || !nombreValido(nombre)) {
        return res.status(400).json({message: "Debes enviar un id y un nombre válidos"});
    }
    try {
        const result = await updateCancion(Number(id), nombre.trim());

        if (result.rowCount == 0) {
            return res.status(404).json({message: "Canción inexistente"});
        }
        return res.send(result.rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor"});
    }
}

export async function deleteCancion(req, res) {
    const { id } = req.body;
    if (!idValido(id)) {
        return res.status(400).json({message: "Debes enviar un id válido"});
    }
    try {
        const result = await deleteCancionById(Number(id));

        if (result.rowCount == 0) {
            return res.status(404).json({message: "Canción inexistente"});
        }
        return res.send(result.rows[0]);
    } catch (error) {
        console.log(error);
        // 23503 = violación de FK: la canción tiene registros en escucha
        if (error.code === '23503') {
            return res.status(409).json({message: "No se puede borrar: la canción tiene escuchas registradas"});
        }
        return res.status(500).json({message: "Error interno del servidor"});
    }
}
