import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usuariosService from "../services/usuario.js";

const secret = process.env.JWT_SECRET || "secret";

const register = async (req, res) => {
    const user = req.body;
    if (!user || !user.usuario || !user.nombre || !user.password) {
        return res.status(400).json({ message: "Hay 1 campo o más sin completar" });
    }
    try {
        const existente = await usuariosService.getUsuarioByUsuario(user.usuario);
        if (existente) {
            return res.status(400).json({ message: "Ya existe ese usuario" });
        }

        user.password = await bcrypt.hash(user.password, 10);
        const nuevo = await usuariosService.createUsuario(user);

        return res.status(201).json(nuevo);
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Hay campos sin completar" });
    }
    try {
        const user = await usuariosService.getUsuarioByUsuario(username);
        if (!user) {
            return res.status(400).json({ message: "Usuario inexistente o clave incorrecta" });
        }
        const passOK = await bcrypt.compare(password, user.password);
        if (!passOK) {
            return res.status(400).json({ message: "Usuario inexistente o clave incorrecta" });
        }
        const token = jwt.sign({ id: user.id, rol: user.rol }, secret, { expiresIn: "1h" });
        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export default { register, login };
