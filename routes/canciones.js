import Router from 'express';
import escuchoController from '../controllers/escuchoController.js';
import { postCancion, putCancion, deleteCancion } from '../controllers/cancionesController.js';
import {verifyToken, verifyAdmin} from '../middlewares/middleware.js';

const router = Router();

router.post('/', verifyToken, verifyAdmin, postCancion);
router.put('/', verifyToken, verifyAdmin, putCancion);
router.delete('/', verifyToken, verifyAdmin, deleteCancion);

router.post('/escucho', verifyToken, escuchoController.escucho);

export default router;
