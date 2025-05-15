// src/entities/Anime.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { User } from "./User";
import { Review } from "./Review";
import { Episode } from "./Episode";

@Entity('anime')
export class Anime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: "float", default: 0 })
  rating: number;

  @Column({ nullable: true })
  status: string; // e.g., "ongoing", "completed"

  @Column("text", { array: true, default: () => "ARRAY[]::text[]" })
  genres: string[];

  @Column({ type: "int", nullable: true })
  releaseYear: number;

  @Column({ nullable: true })
  aired: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  studio: string;

  @Column({ nullable: true })
  source: string;

  @OneToMany(() => Review, (review) => review.anime)
  reviews: Review[];

  @OneToMany(() => Episode, episode => episode.anime, { cascade: true })
  episodes: Episode[];

  @ManyToMany(() => User, (user) => user.animes)
  users: User[];
}