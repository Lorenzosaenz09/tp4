import Router from "express";
import AuthController from "../controllers/auth.js";

const router = Router();

router.post("/crearUsuario", AuthController.register);
router.post("/login", AuthController.login);

export default router;
