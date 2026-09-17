const Createuser = async (req, res) => {
  const user = req.body;
  if (!user.nombre || !user.userid || !user.password) {
    return res.status(400).json({ menssage: 'Te faltan completar campos' });
  }

  try {
    await client.connect();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const result = //await Createuser.service.createuser
    await client.query(
      'INSERT INTO usuario (nombre, userid, password) VALUES ($1, $2, $3) RETURNING *',
      [user.nombre, user.userid, user.password]
    );

    await client.end();
    console.log('Perfil creado:', result.rowCount);
    return res.send(result.rows);

} 
  
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
}