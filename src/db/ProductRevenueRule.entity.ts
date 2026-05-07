import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('product_revenue_rules')
export class ProductRevenueRule {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne('Product', 'revenueRule')
  @JoinColumn()
  product!: any;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  creatorPercent!: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  sellerPercent!: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  affiliatePercent!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
