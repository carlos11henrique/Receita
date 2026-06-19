import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nome!: string;

  @ManyToMany('Receita', 'tags')
  receitas!: any[];

  @CreateDateColumn()
  createdAt!: Date;
}