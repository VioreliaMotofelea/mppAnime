import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import animeRoutes from "./routes/animeRoutes";
import userRoutes from "./routes/userRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import episodeRoutes from "./routes/episodeRoutes";
import postRoutes from "./routes/postRoutes";

const app = express();
app.use(express.json());

AppDataSource.initialize().then(() => {
  app.use("/animes", animeRoutes);
  app.use("/users", userRoutes);
  app.use("/reviews", reviewRoutes);
  app.use("/episodes", episodeRoutes);
  app.use("/posts", postRoutes);
  
  app.listen(3000, () => console.log("Server running on port 3000"));
});