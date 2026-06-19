import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

import { Receita } from './Receita.entity';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
    unique: true,
  })
  nome!: string;

  @ManyToMany(
    () => Receita,
    (receita) => receita.tags,
  )
  receitas!: Receita[];

  @CreateDateColumn()
  createdAt!: Date;
}