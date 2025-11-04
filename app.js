import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import booksRouter from "./routes/api/booksRouter.js";
import authRouter from "./routes/api/authRouter.js";

import { errorHandler } from "./middlewares/index.js";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/books", booksRouter);
app.use("api/auth", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

export default app;
