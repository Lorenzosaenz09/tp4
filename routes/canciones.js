import Router from 'express';
<<<<<<< HEAD

import { verifyToken } from '../Middlewares/middleware.js';

import { getEscucho, setEscucho } from '../controllers/escuchoController.js';

const router = Router();

router.get('/escucho', verifyToken, getEscucho);

router.post('/escucho/:id', verifyToken, setEscucho);
=======
import escuchoController from '../controllers/escuchoController.js';
import { postCancion, putCancion, deleteCancion } from '../controllers/cancionesController.js';
import {verifyToken, verifyAdmin} from '../middlewares/middleware.js';

const router = Router();

router.post('/', verifyToken, verifyAdmin, postCancion);
router.put('/', verifyToken, verifyAdmin, putCancion);
router.delete('/', verifyToken, verifyAdmin, deleteCancion);

router.post('/escucho', verifyToken, escuchoController.escucho);
>>>>>>> e436c8347b3a2b5cd42a2b6cf30d1382fe7bd4ab

export default router;
