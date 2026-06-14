import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity('favorito')
export class Favorito {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne('User')
  usuario!: any;

  @ManyToOne('Receita', 'favoritos')
  receita!: any;

  @CreateDateColumn()
  createdAt!: Date;
}