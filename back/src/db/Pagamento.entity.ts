import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity('pagamento')
export class Pagamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne('Compra', 'pagamento')
  compra!: any;

  @Column('decimal', { precision: 10, scale: 2 })
  valor!: number;

  @Column({
    type: 'enum',
    enum: ['pago', 'pendente', 'cancelado'],
    default: 'pendente',
  })
  status!: 'pago' | 'pendente' | 'cancelado';

  @ManyToOne('FormaPagamento', 'pagamentos')
  formaPagamento!: any;

  @CreateDateColumn()
  createdAt!: Date;
}
