import pkg from 'pg';
import dbconfig from '../dbconfig.js';

const { Client } = pkg;

import pkg from 'pg'
import dbconfig from '../dbconfig.js'


// Postgres Pool en vez de client, no necesita connect ni end
const {Pool} = pkg;
const pool = new Pool(dbconfig)


export async function insertUsuario(username, nombre, pwd) {
    return await pool.query("insert into usuario(usuario, nombre, password) values ($1,$2,$3) returning id",
      [username, nombre,pwd])
}


export async function getUsuarioByUsername(username) {
    const client = new Client(dbconfig);

    await client.connect();

    const result = await client.query(
        "SELECT * FROM usuario WHERE nombre = $1",
        [username]
    );

    await client.end();

    return result;
}