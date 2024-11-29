import express from "express";
import mongoose from "mongoose";
import pollsRouter from "./routes/polls.router.js";
import cors from "cors";

const app = express();
const PORT = 8080;

mongoose
    .connect(
        "mongodb+srv://coderBackend50015:coderBackend50015@cluster0.qutkujb.mongodb.net/"
    )
    .then(console.log("Connected to MongoDB"));

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Habilitar CORS
app.use(
    cors({
        origin: "http://localhost:5173", // Cambia esto por la URL de tu frontend
        methods: ["GET", "POST"], // Métodos permitidos
        allowedHeaders: ["Content-Type"], // Encabezados permitidos
    })
);

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api", pollsRouter);
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
