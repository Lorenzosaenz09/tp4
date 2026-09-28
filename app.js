import pkg from 'pg';
import dbconfig from './dbconfig.js';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cancionesRouter from './routes/canciones.js';
import LoginRouter from './routes/LoginRouter.js';


const app = express();


app.use(express.json());
app.use(cors());

app.use("/canciones", cancionesRouter);
app.use("/registro", CreateRouter);
app.use("/", LoginRouter);


router.get('/escucho', verifyToken, async (req, res) => {
  const H = req.headers["authorization"];
  token = H.split("")[i]
  if (!token) {
    return res.status(400).json({menssage: "Te falta enviar el token"});
  }
  try {
    token = await jwt.verify(token, secretkey)
  } catch (e){
    console.log(e);
  }
  try {
    await client.connect();
    let result = await client.query(`select c.nombre, e.reproducciones 
                                    from cancion c join escucha e 
                                    on c.id = e.cancion_id where e.usuario_id =$1`,[id]);
    res.send(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    await client.end();
  }
})

//const port = 3000;
app.get('/',(req,res)=>res.send("Welcome " + usuario ))

// export default app;
// const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
  //console.log(`Local en http://localhost:${PORT}`);
//});
export default app;