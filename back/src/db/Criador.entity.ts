import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('criador')
export class Criador {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nome!: string;

  @Column('text', { nullable: true })
  descricao?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn()
  user?: User;

  @OneToMany('Receita', 'criador')
  receitas!: any[];
}
