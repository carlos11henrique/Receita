import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  title!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column({ length: 50, default: 'active' })
  status!: string;

  @Column('text', { nullable: true })
  rejectionReason?: string;

  @ManyToOne('User', 'productsCreated')
  creator!: any;

  @ManyToOne('User', 'productsSold')
  seller!: any;

  @OneToMany('AffiliateLink', 'product')
  affiliateLinks!: any[];

  @OneToMany('Order', 'product')
  orders!: any[];

  @OneToOne('ProductRevenueRule', 'product')
  @JoinColumn()
  revenueRule!: any;

  @CreateDateColumn()
  createdAt!: Date;
}
