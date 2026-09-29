import pkg from 'pg';
import dbconfig from '../dbconfig.js';

const { Client } = pkg;

export async function getEscuchoByUser(user_id) {
    const client = new Client(dbconfig);

    await client.connect();

    const result = await client.query(
        `SELECT c.nombre, e.reproducciones
         FROM cancion c
         JOIN escucha e ON c.id = e.cancion_id
         WHERE e.usuario_id = $1`,
        [user_id]
    );

    await client.end();

    return result;
}