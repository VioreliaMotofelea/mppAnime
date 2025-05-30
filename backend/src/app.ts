import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import animeRoutes from "./routes/animeRoutes";
import userRoutes from "./routes/userRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import episodeRoutes from "./routes/episodeRoutes";
import postRoutes from "./routes/postRoutes";
import adminRoutes from "./routes/admin.routes";
import { activityLogger } from "./middleware/activity-logger.middleware";
import { MonitoringService } from "./services/monitoring.service";

const app = express();
app.use(express.json());

// Initialize monitoring service
const monitoringService = new MonitoringService();

AppDataSource.initialize().then(() => {
  // Apply activity logging middleware to all routes
  app.use(activityLogger);

  // Start monitoring service
  monitoringService.start();

  // Routes
  app.use("/api/animes", animeRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/reviews", reviewRoutes);
  app.use("/api/episodes", episodeRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/admin", adminRoutes);
  
  app.listen(3000, () => console.log("Server running on port 3000"));
});