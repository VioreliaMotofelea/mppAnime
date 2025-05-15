import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Anime } from "./Anime";
import { Review } from "./Review";
import { User } from "./User";

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  duration: number; // in minutes

  @ManyToOne(() => Anime, anime => anime.episodes, { onDelete: "CASCADE" })
  anime: Anime;
} 