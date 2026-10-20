import cancionService from "../services/cancion.js";

const MAX_NOMBRE = 255;

function nombreValido(nombre) {
    return typeof nombre === "string" && nombre.trim() !== "" && nombre.length <= MAX_NOMBRE;
}

function idValido(id) {
    return Number.isInteger(Number(id)) && Number(id) > 0;
}

const getCanciones = async (req, res) => {
    try {
        const canciones = await cancionService.getCanciones(req.user.id);
        return res.status(200).json(canciones);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

const escuchoCancion = async (req, res) => {
    const { cancion } = req.body;
    if (!idValido(cancion)) {
        return res.status(400).json({ message: "Debes enviar el id de la canción" });
    }
    try {
        const escucha = await cancionService.escuchoCancion(Number(cancion), req.user.id);
        return res.status(201).json(escucha);
    } catch (error) {
        console.error(error);
        // 23503 = violación de FK: la canción o el usuario no existen
        if (error.code === "23503") {
            return res.status(404).json({ message: "Canción inexistente" });
        }
        return res.status(500).json({ message: error.message });
    }
}

const postCancion = async (req, res) => {
    const { nombre } = req.body;
    if (!nombreValido(nombre)) {
        return res.status(400).json({ message: "Debes enviar un nombre válido" });
    }
    try {
        const nuevaCancion = await cancionService.postCancion(nombre.trim());
        return res.status(201).json(nuevaCancion);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

const putCancion = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!idValido(id) || !nombreValido(nombre)) {
        return res.status(400).json({ message: "Debes enviar un id y un nombre válidos" });
    }
    try {
        const cancionActualizada = await cancionService.putCancion(Number(id), nombre.trim());
        if (!cancionActualizada) {
            return res.status(404).json({ message: "Canción inexistente" });
        }
        return res.status(200).json(cancionActualizada);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

const deleteCancion = async (req, res) => {
    const { id } = req.params;
    if (!idValido(id)) {
        return res.status(400).json({ message: "Debes enviar un id válido" });
    }
    try {
        const borrada = await cancionService.deleteCancion(Number(id));
        if (!borrada) {
            return res.status(404).json({ message: "Canción inexistente" });
        }
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        // 23503 = violación de FK: la canción tiene registros en escucha
        if (error.code === "23503") {
            return res.status(409).json({ message: "No se puede borrar: la canción tiene escuchas registradas" });
        }
        return res.status(500).json({ message: error.message });
    }
}

export default { getCanciones, escuchoCancion, postCancion, putCancion, deleteCancion };
