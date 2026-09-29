import * as escuchoService from '../services/escuchoService.js';

export async function getEscucho(req, res) {
    try {
        const result = await escuchoService.getEscuchoByUser(req.user_id);

        res.status(200).json({message: result.rows});
    }
    catch (err) {
        console.log("Error:", err);
        return res.status(500).json({message: err.message});
    }
}

export async function setEscucho(req, res) {
    const cancion_id = req.params.id;

    try {
        const result = await escuchoService.sumarEscucho(req.user_id, cancion_id);

        res.status(201).json({message: result.rows});
    }
    catch (err) {
        console.log("Error:", err);
        return res.status(500).json({message: err.message});
    }
}