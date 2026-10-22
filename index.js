import "dotenv/config";
import express from "express";
import cors from "cors";
import AuthRouter from "./routes/auth.js";
import CancionRouter from "./routes/cancion.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_, res) => res.send("SpoTICfy API is running..."));
app.use("/auth", AuthRouter);
app.use("/cancion", CancionRouter);

app.listen(process.env.PORT || 8000, () =>
    console.log(`Server is running on port ${process.env.PORT || 8000}`)
);

export default app;
