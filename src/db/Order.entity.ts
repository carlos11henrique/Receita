import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne('User', 'orders')
  customer!: any;

  @ManyToOne('Product', 'orders')
  product!: any;

  @ManyToOne('User', 'affiliateOrders')
  affiliate?: any;

  @Column('decimal', { precision: 10, scale: 2 })
  total!: number;

  @Column({ length: 50, default: 'pending' })
  status!: string;

  @OneToMany('AffiliateCommission', 'order')
  commissions!: any[];

  @CreateDateColumn()
  createdAt!: Date;
}
