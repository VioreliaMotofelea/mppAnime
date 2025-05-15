import { DataSource } from "typeorm";
import { Anime } from "./src/entities/Anime";
import { Episode } from "./src/entities/Episode";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "anime.db",
  synchronize: true,
  logging: false,
  entities: [Anime, Episode],
}); 