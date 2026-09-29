import Router from 'express';

import { getEscucho, setEscucho } from '../controllers/escuchoController.js';
import { postCancion, putCancion, deleteCancion } from '../controllers/cancionesController.js';
import {verifyToken, verifyAdmin} from '../middlewares/middleware.js';

const router = Router();

router.post('/', verifyToken, verifyAdmin, postCancion);
router.put('/', verifyToken, verifyAdmin, putCancion);
router.delete('/', verifyToken, verifyAdmin, deleteCancion);

router.post('/escucho/:id', verifyToken, setEscucho);

export default router;
