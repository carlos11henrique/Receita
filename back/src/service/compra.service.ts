import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from '../db/Compra.entity';
import { User } from '../db/user.entity';
import { Receita } from '../db/Receita.entity';
import { Pagamento } from '../db/Pagamento.entity';
import { CreateCompraDto } from '../dto/CreateCompraDto';
import { UpdateCompraDto } from '../dto/UpdateCompraDto';

@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(Compra)
    private compraRepository: Repository<Compra>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Receita)
    private receitaRepository: Repository<Receita>,
    @InjectRepository(Pagamento)
    private pagamentoRepository: Repository<Pagamento>,
  ) {}

  async create(createCompraDto: CreateCompraDto): Promise<Compra> {
    const { usuarioId, receitaId, pagamentoId, ...compraData } = createCompraDto;

    const usuario = await this.userRepository.findOne({ where: { id: usuarioId } });
    if (!usuario) {
      throw new NotFoundException('User not found');
    }

    const receita = await this.receitaRepository.findOne({ where: { id: receitaId } });
    if (!receita) {
      throw new NotFoundException('Receita not found');
    }

    let pagamento: Pagamento | null = null;
    if (pagamentoId) {
      pagamento = await this.pagamentoRepository.findOne({ where: { id: pagamentoId } });
      if (!pagamento) {
        throw new NotFoundException('Pagamento not found');
      }
    }

    const compra = this.compraRepository.create({
      ...compraData,
      usuario,
      receita,
      pagamento,
    });

    return this.compraRepository.save(compra);
  }

  async findAll(): Promise<Compra[]> {
    return this.compraRepository.find({
      relations: ['usuario', 'receita', 'pagamento'],
    });
  }

  async findOne(id: number): Promise<Compra> {
    const compra = await this.compraRepository.findOne({
      where: { id },
      relations: ['usuario', 'receita', 'pagamento'],
    });
    if (!compra) {
      throw new NotFoundException('Compra not found');
    }
    return compra;
  }

  async update(id: number, updateCompraDto: UpdateCompraDto): Promise<Compra> {
    const compra = await this.findOne(id);
    Object.assign(compra, updateCompraDto);
    return this.compraRepository.save(compra);
  }

  async remove(id: number): Promise<void> {
    const compra = await this.findOne(id);
    await this.compraRepository.remove(compra);
  }
}