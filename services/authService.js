import pkg from 'pg';
import dbconfig from '../dbconfig.js';

const { Client } = pkg;

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