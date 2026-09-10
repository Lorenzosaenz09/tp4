import Router from 'express';
import escuchoController from '../controllers/escuchoController.js';

const router = Router();

router.post('/escucho', escuchoController.escucho);

export default router;