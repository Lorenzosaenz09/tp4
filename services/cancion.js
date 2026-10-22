import pkg from "pg";
import { config } from "../dbconfig.js";

const { Client } = pkg;

const getCanciones = async (usuarioid) => {
    const client = new Client(config);
    await client.connect();
    try {
        const { rows } = await client.query(
            `SELECT c.id, c.nombre, e.reproducciones
             FROM cancion c
             JOIN escucha e ON c.id = e.cancionid
             WHERE e.usuarioid = $1`,
            [usuarioid]
        );
        return rows;
    } finally {
        await client.end();
    }
};

// Si el usuario ya escuchó la canción suma 1 reproducción, si no crea el registro
const escuchoCancion = async (cancionid, usuarioid) => {
    const client = new Client(config);
    await client.connect();
    try {
        const update = await client.query(
            `UPDATE escucha SET reproducciones = COALESCE(reproducciones, 0) + 1
             WHERE usuarioid = $1 AND cancionid = $2
             RETURNING *`,
            [usuarioid, cancionid]
        );
        if (update.rowCount > 0) return update.rows[0];

        const { rows } = await client.query(
            `INSERT INTO escucha (usuarioid, cancionid, reproducciones)
             VALUES ($1, $2, 1)
             RETURNING *`,
            [usuarioid, cancionid]
        );
        return rows[0];
    } finally {
        await client.end();
    }
};

const postCancion = async (nombre) => {
    const client = new Client(config);
    await client.connect();
    try {
        const { rows } = await client.query(
            "INSERT INTO cancion (nombre) VALUES ($1) RETURNING *",
            [nombre]
        );
        return rows[0];
    } finally {
        await client.end();
    }
};

const putCancion = async (id, nombre) => {
    const client = new Client(config);
    await client.connect();
    try {
        const { rows } = await client.query(
            "UPDATE cancion SET nombre = $1 WHERE id = $2 RETURNING *",
            [nombre, id]
        );
        return rows[0] || null;
    } finally {
        await client.end();
    }
};

const deleteCancion = async (id) => {
    const client = new Client(config);
    await client.connect();
    try {
        const { rows } = await client.query(
            "DELETE FROM cancion WHERE id = $1 RETURNING *",
            [id]
        );
        return rows[0] || null;
    } finally {
        await client.end();
    }
};

export default { getCanciones, escuchoCancion, postCancion, putCancion, deleteCancion };
