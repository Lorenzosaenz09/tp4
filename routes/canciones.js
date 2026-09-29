import Router from 'express';
import escuchoController from '../controllers/escuchoController.js';
import {verifyToken, verifyAdmin} from '../middlewares/autorizaciones.js';  

const router = Router();

router.post('/escucho', verifyToken, escuchoController.escucho);

export default router;