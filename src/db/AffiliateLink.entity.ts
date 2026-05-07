import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity('affiliate_links')
export class AffiliateLink {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne('User', 'affiliateLinks')
  affiliate!: any;

  @ManyToOne('Product', 'affiliateLinks')
  product!: any;

  @Column({ length: 100, unique: true })
  code!: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  commissionPercent!: number;

  @Column({ type: 'int', default: 0 })
  totalClicks!: number;

  @Column({ type: 'int', default: 0 })
  totalSales!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
