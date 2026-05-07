import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity('affiliate_commissions')
export class AffiliateCommission {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne('User', 'affiliateCommissions')
  affiliate!: any;

  @ManyToOne('Order', 'commissions')
  order!: any;

  @ManyToOne('Product')
  product!: any;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @Column('decimal', { precision: 5, scale: 2 })
  percent!: number;

  @Column({ length: 50, default: 'pending' })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
