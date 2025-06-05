import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import { Anime } from "./entities/Anime";
import { Review } from "./entities/Review";
import { Episode } from "./entities/Episode";
import * as dotenv from "dotenv";
dotenv.config();

// console.log("PG_USER from env:", process.env.PG_USER);
// console.log("Full env:", process.env);

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST ?? "dpg-d111r2ali9vc738af93g-a",
    port: Number(process.env.PG_PORT) ?? 5432,
    username: process.env.PG_USER ?? "anime_user",
    password: process.env.PG_PASSWORD ?? "iXZIvOAgumhbRWZoZX4nchJWlW8tikza",
    database: process.env.PG_DATABASE ?? "anime_db_qvi9",
    synchronize: true,
    logging: true,
    entities: [User, Post, Anime, Review, Episode],
});