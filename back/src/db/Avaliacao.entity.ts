import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity('avaliacao')
export class Avaliacao {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne('User')
  usuario!: any;

  @ManyToOne('Receita', 'avaliacoes')
  receita!: any;

  @Column({ type: 'int', width: 1 })
  nota!: number; // 1 a 5

  @CreateDateColumn()
  createdAt!: Date;
}