import pkg from 'pg';
import dbconfig from '../dbconfig.js';

const { Client } = pkg;

export async function createCancion(nombre) {
    const client = new Client(dbconfig);

    await client.connect();

    const result = await client.query(
        "INSERT INTO cancion (nombre) VALUES ($1) RETURNING *",
        [nombre]
    );

    await client.end();

    return result;
}

export async function updateCancion(id, nombre) {
    const client = new Client(dbconfig);

    await client.connect();

    const result = await client.query(
        "UPDATE cancion SET nombre = $1 WHERE id = $2 RETURNING *",
        [nombre, id]
    );

    await client.end();

    return result;
}

export async function deleteCancion(id) {
    const client = new Client(dbconfig);

    await client.connect();

    const result = await client.query(
        "DELETE FROM cancion WHERE id = $1 RETURNING *",
        [id]
    );

    await client.end();

    return result;
}
