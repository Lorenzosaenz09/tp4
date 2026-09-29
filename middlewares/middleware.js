import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send({error: 'No llegó ningún token en los headers'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, secret);

        req.user_id = payload.id;
        req.rol = payload.rol;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).send({error: 'Unauthorized'});
    }
}

export const verifyAdmin = (req, res, next) => {
    if (req.rol !== 'A') {
        return res.status(403).send({error: 'Forbidden: sólo un admin puede hacer esto'});
    }

    next();
}