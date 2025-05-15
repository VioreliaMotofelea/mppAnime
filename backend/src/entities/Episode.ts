import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Anime } from "./Anime";
import { Review } from "./Review";
import { User } from "./User";

@Entity('episode')
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  number: number;

  @Column({ nullable: true })
  duration: number;

  @ManyToOne(() => Anime, anime => anime.episodes, { onDelete: "CASCADE" })
  anime: Anime;
} 