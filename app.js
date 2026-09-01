import pkg from 'pg'
import dbconfig from './dbconfig.js'
import express from 'express'
import jwt from 'jsonwebtoken';

const secretkey = process.env.JWT_SECRET;
const {Client} = pkg;
const client = new Client(dbconfig)

app.post('/createuser', async (req, res) => {
  const user = req.body;
  if (!user.nombre || !user.userid || !user.password) {
    return res.status(400).json({menssage: "Te faltan completar campos"});
  }
  try {
    await client.connect();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    let result = await client.query("insert into usuario values ($1, $2, $3") returning *", [user.nombre, user.id, user.password]);
    await client.end();
    console.log("Perfil creado:" ,result.rowCount);
    res.send(result.rows)
  }
  catch (error) {

    return res.status(500).json({ message: error.message})
  }
})


app.post('/login', async (req, res) => {
  const user = req.body;
  if (!user.name || !user.password) {
    return res.status(400).json({menssage: "Te faltan completar campos"});
  }
  try {
    await client.connect();
    let result = await client.query("select * from usuario where nombre=$1", [user.name]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "el usuario buscado no existe"});
    }
    let dbUser = result.rows[0];
    const passOK=await bcrypt.compare (user.password, dbUser.password);
    if (passOK)
    {
      const payload = {
        id: dbUser.id
      };
      const token = jwt.sign(payload, secretkey);
      res.send({token: token})
    } else { res.send("clave invalida")}

   } catch (errror) {
    
   return res.status(500).json({ message: error.message});
   }
    await client.end();
    console.log("Perfil creado:" ,result.rowCount);
    res.send(result.rows)
  })

app.get('/escucho', async (req, res) => {
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
    let result = await client.query("select * from canciones where id = $1", [token.id]);
   }
})

const app = express()
//const port = 3000;
app.get('/',(req,res)=>res.send("Welcome " + usuario ))

// export default app;
// const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
  //console.log(`Local en http://localhost:${PORT}`);
//});
export default app;