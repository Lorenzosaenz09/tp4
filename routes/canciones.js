import Router from 'express';

import { verifyToken } from '../Middlewares/middleware.js';

import { getEscucho, setEscucho } from '../controllers/escuchoController.js';

const router = Router();

router.get('/escucho', verifyToken, getEscucho);

router.post('/escucho/:id', verifyToken, setEscucho);

export default router;