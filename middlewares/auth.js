import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret";

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).send({ error: "No llegó ningún token en los headers" });
    }
    const token = authHeader.split(" ")[1];
    try {
        req.user = jwt.verify(token, secret);
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).send({ error: "Unauthorized" });
    }
}

export const verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.rol !== "A") {
        return res.status(403).send({ error: "Forbidden: sólo un admin puede hacer esto" });
    }
    next();
}
