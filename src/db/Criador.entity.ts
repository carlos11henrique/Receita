import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

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

  @OneToMany('Receita', 'criador')
  receitas!: any[];
}
