import pkg from "pg";
import { config } from "../dbconfig.js";

const { Client } = pkg;

const getUsuarioByUsuario = async (usuario) => {
    const client = new Client(config);
    await client.connect();
    try {
        const { rows } = await client.query(
            "SELECT * FROM usuario WHERE usuario = $1",
            [usuario]
        );
        return rows[0] || null;
    } finally {
        await client.end();
    }
};

const createUsuario = async (usuario) => {
    const client = new Client(config);
    await client.connect();
    try {
        const { rows } = await client.query(
            "INSERT INTO usuario (usuario, nombre, password) VALUES ($1, $2, $3) RETURNING id, usuario, nombre, rol",
            [usuario.usuario, usuario.nombre, usuario.password]
        );
        return rows[0];
    } finally {
        await client.end();
    }
};

export default { getUsuarioByUsuario, createUsuario };
