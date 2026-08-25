import pkg from 'pg'
import dbconfig from './dbconfig.js'
import express from 'express'

const {Client} = pkg;
const client = new Client(dbconfig)
await client.connect()

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
  if (!user.userid || !user.password) {
    return res.status(400).json({menssage: "Te faltan completar campos"});
  }
  try {
    await client.connect();
    let result = await client.query("select * from usuario where userid=$1", [user.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "el usuario buscado no existe"});
    }
    let dbUser = result.rows[0];
    const passOK=await bcrypt.compare (user.password, dbUser.password);
    if (passOK)
    {
      res.send({nombre: dbUser.nombre})
    } else { res.send("clave invalida")}

   } catch (errror) {
    
   return res.status(500).json({ message: error.message});
   }
    await client.end();
    console.log("Perfil creado:" ,result.rowCount);
    res.send(result.rows)
  })

await client.end()

const app = express()
//const port = 3000;
app.get('/',(req,res)=>res.send("Welcome " + usuario ))

// export default app;
// const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
  //console.log(`Local en http://localhost:${PORT}`);
//});
export default app;