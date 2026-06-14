import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('compra')
export class Compra {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne('User')
  usuario!: any;

  @ManyToOne('Receita', 'compras')
  receita!: any;

  @Column({ type: 'date' })
  dataCompra!: Date;

  @OneToOne('Pagamento', 'compra')
  @JoinColumn()
  pagamento!: any;

  @CreateDateColumn()
  createdAt!: Date;
}