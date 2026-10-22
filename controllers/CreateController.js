  
  import { insertUsuario,getUsuarioByUsername } from '../Services/authService.js';
  import bcrypt from 'bcrypt';
  import jwt from 'jsonwebtoken';

  const secret = process.env.JWT_SECRET;
  export async function  CreateUser (req, res) {
      const user = req.body;
      if(!user.username || !user.nombre || !user.password  )
        return res.status(400).json({message:"Debes completar todos los campos"})

      const hashedPwd = await bcrypt.hash(user.password,10);

      try {
        const result = await insertUsuario(user.username, user.nombre, hashedPwd)
        console.log("result.rows", result.rows)
          res.status(201).json({message:"Usuario creado!, id:" + result.rows[0].id})

      }
      catch (err) {
        console.log("Error:", err)
        return res.status(500).json({message: err.message})
      }
}