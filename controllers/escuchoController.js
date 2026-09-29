import { getEscuchoByUser } from '../services/escuchoService.js';

export async function getEscucho(req, res) {

    try {
        const result = await getEscuchoByUser(req.user_id);

        return res.send(result.rows);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
}   