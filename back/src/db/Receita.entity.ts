import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Criador } from './Criador.entity';
import { Genero } from './genero.entity';

@Entity('receita')
export class Receita {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  titulo!: string;

  @Column('text')
  descricao!: string;

  @Column('text')
  modoPreparo!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco!: number;

  @Column({ length: 500, nullable: true })
  imageUrl?: string;

  @ManyToOne(() => Criador, (criador) => criador.receitas)
  criador!: Criador;

  @ManyToMany(() => Genero)
  @JoinTable({
    name: 'receita_categoria',
    joinColumn: { name: 'receitaId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoriaId', referencedColumnName: 'id' },
  })
  categorias!: Genero[];

  @OneToMany('Compra', 'receita')
  compras!: any[];

  @OneToMany('Avaliacao', 'receita')
  avaliacoes!: any[];

  @OneToMany('Comentario', 'receita')
  comentarios!: any[];

  @OneToMany('Favorito', 'receita')
  favoritos!: any[];

  @CreateDateColumn()
  createdAt!: Date;
}
