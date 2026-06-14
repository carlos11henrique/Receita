import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity('forma_pagamento')
export class FormaPagamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  nome!: string; // pix, cartão, dinheiro

  @OneToMany('Pagamento', 'formaPagamento')
  pagamentos!: any[];

  @CreateDateColumn()
  createdAt!: Date;
}