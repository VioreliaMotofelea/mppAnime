import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from "typeorm";
import { User } from "./User";
import { Anime } from "./Anime";
import { Episode } from "./Episode";

@Entity()
@Unique(["user", "anime"])
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Anime, (anime) => anime.reviews)
  anime: Anime;
}