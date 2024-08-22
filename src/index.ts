import express from "express";
import authRouter from "./routes/auth.routes";
import { config } from "dotenv";
import dataBaseConfig from "./configs/databaseConfig";
import artistRouter from "./routes/artist.routes";
import movieRouter from "./routes/movie.routes";

config();

const app = express();
const port = process.env.APP_PORT || 3000;

dataBaseConfig();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/artist", artistRouter);
app.use("/api/movie", movieRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
