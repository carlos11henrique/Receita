import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

import { Receita } from './Receita.entity';

@Entity('cozinha')
export class Cozinha {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 100,
    unique: true,
  })
  nome!: string;

  @ManyToMany(
    () => Receita,
    (receita) => receita.cozinhas,
  )
  receitas!: Receita[];

  @CreateDateColumn()
  createdAt!: Date;
}