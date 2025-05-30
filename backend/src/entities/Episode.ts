import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Anime } from './Anime';
import { Review } from "./Review";
import { User } from "./User";

@Entity('episode')
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  number: number;

  @ManyToOne(() => Anime, anime => anime.episodes)
  @JoinColumn({ name: 'animeId' })
  anime: Anime;

  @Column()
  animeId: number;
} 