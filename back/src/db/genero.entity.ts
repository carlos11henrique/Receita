import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

@Entity('genero')
export class Genero {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nome!: string;

  @ManyToMany('Receita', 'categorias')
  receitas!: any[];

  @CreateDateColumn()
  createdAt!: Date;
}
