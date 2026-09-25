import { getUsuarioByUsername } from '../services/authService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export async function login(req, res) {
    const user = req.body;
    if (!user.username || !user.password){
        return res.status(400).json({message: "Debes completar todos los campos"});}
    try {
        const result = await getUsuarioByUsername(user.username);

        if (result.rowCount == 0){
            return res.status(400).json({message: "Usuario inexistente o clave incorrecta"});}
        const dbUser = result.rows[0];
        const passOK = await bcrypt.compare(user.password, dbUser.password);
        if (!passOK) {
            return res.status(400).json({message: "Usuario inexistente o clave incorrecta"});
        }
        const payload = {
            id: dbUser.id,
            rol: dbUser.rol
        };
        const token = jwt.sign(payload, secret, {expiresIn: '1h'});

        res.send({token: token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }}
        
    
