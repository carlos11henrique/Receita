import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './Product.entity';
import { User } from './user.entity';

@Entity('product_comment')
export class ProductComment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { eager: true })
  user!: User;

  @ManyToOne(() => Product, { eager: false })
  product!: Product;

  @Column('text')
  text!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
