import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nome!: string;

  @ManyToMany('Receita', 'categorias')
  receitas!: any[];

  @CreateDateColumn()
  createdAt!: Date;
}