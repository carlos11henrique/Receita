import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

@Entity('cozinha')
export class Cozinha {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nome!: string;

  @ManyToMany('Receita', 'cozinhas')
  receitas!: any[];

  @CreateDateColumn()
  createdAt!: Date;
}