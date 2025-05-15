import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Anime } from "./Anime";
import { Review } from "./Review";
import { Episode } from "./Episode";
import { Post } from "./Post";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => Post, (post: Post) => post.user)
  posts: Post[];


  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @ManyToMany(() => Anime, (anime) => anime.users)
  @JoinTable()
  animes: Anime[];
}

// import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
// import { Post } from "./Post";
// import { Anime } from "./Anime";

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @OneToMany(() => Post, (post: Post) => post.user)
//   posts: Post[];

//   @ManyToMany(() => Anime, (anime) => anime.users)
//   animes: Anime[];
// }