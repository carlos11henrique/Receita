import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserRole } from './user-role.enum';
import { Criador } from './Criador.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ length: 100, select: false })
  password!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role!: UserRole;

  @OneToMany('Compra', 'usuario')
  compras!: any[];

  @OneToMany('Avaliacao', 'usuario')
  avaliacoes!: any[];

  @OneToMany('Comentario', 'usuario')
  comentarios!: any[];

  @OneToMany('Favorito', 'usuario')
  favoritos!: any[];

  @OneToMany('Product', 'creator')
  productsCreated!: any[];

  @OneToMany('Product', 'seller')
  productsSold!: any[];

  @OneToMany('AffiliateLink', 'affiliate')
  affiliateLinks!: any[];

  @OneToMany('Order', 'customer')
  orders!: any[];

  @OneToMany('Order', 'affiliate')
  affiliateOrders!: any[];

  @OneToMany('AffiliateCommission', 'affiliate')
  affiliateCommissions!: any[];

  @OneToOne(() => Criador, (criador) => criador.user)
  criador?: Criador;

  @CreateDateColumn()
  createdAt!: Date;
}
