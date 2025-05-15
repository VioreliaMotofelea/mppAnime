import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from "typeorm";
import { User } from "./User";
import { Anime } from "./Anime";
import { Episode } from "./Episode";

@Entity('review')
@Unique(["user", "anime"])
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Anime, (anime) => anime.reviews, { onDelete: "CASCADE" })
  anime: Anime;
}