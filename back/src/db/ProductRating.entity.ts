import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './Product.entity';
import { User } from './user.entity';

@Entity('product_rating')
export class ProductRating {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { eager: true })
  user!: User;

  @ManyToOne(() => Product, { eager: false })
  product!: Product;

  @Column({ type: 'int', width: 1 })
  score!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
