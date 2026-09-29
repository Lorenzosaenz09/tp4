import escuchoService from '../services/escuchoService.js';

const escuchoController = async (req, res) =>  {
    try{
        const escuchas = await escuchoService.escucho()
        res.json(escucho);
    } catch (error){
        res.status(500).json({ message: error.message})
    }
}