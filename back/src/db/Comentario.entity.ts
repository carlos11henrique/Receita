import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity('comentario')
export class Comentario {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne('User')
  usuario!: any;

  @ManyToOne('Receita', 'comentarios')
  receita!: any;

  @Column('text')
  texto!: string;

  @Column({ type: 'date' })
  data!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}