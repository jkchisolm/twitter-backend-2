/* eslint-disable import/prefer-default-export */
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Post from './Post';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  name: string;

  @Column('text', { unique: true })
  handle: string;

  @Column('text')
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}

export default User;
