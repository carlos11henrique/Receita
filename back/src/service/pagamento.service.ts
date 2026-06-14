import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagamento } from '../db/Pagamento.entity';
import { Compra } from '../db/Compra.entity';
import { FormaPagamento } from '../db/FormaPagamento.entity';
import { CreatePagamentoDto } from '../dto/CreatePagamentoDto';
import { UpdatePagamentoDto } from '../dto/UpdatePagamentoDto';

@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(Pagamento)
    private pagamentoRepository: Repository<Pagamento>,
    @InjectRepository(Compra)
    private compraRepository: Repository<Compra>,
    @InjectRepository(FormaPagamento)
    private formaPagamentoRepository: Repository<FormaPagamento>,
  ) {}

  async create(createPagamentoDto: CreatePagamentoDto): Promise<Pagamento> {
    const { compraId, formaPagamentoId, ...pagamentoData } = createPagamentoDto;

    const compra = await this.compraRepository.findOne({ where: { id: compraId } });
    if (!compra) {
      throw new NotFoundException('Compra not found');
    }

    const formaPagamento = await this.formaPagamentoRepository.findOne({ where: { id: formaPagamentoId } });
    if (!formaPagamento) {
      throw new NotFoundException('FormaPagamento not found');
    }

    const pagamento = this.pagamentoRepository.create({
      ...pagamentoData,
      compra,
      formaPagamento,
    });

    return this.pagamentoRepository.save(pagamento);
  }

  async findAll(): Promise<Pagamento[]> {
    return this.pagamentoRepository.find({
      relations: ['compra', 'formaPagamento'],
    });
  }

  async findOne(id: number): Promise<Pagamento> {
    const pagamento = await this.pagamentoRepository.findOne({
      where: { id },
      relations: ['compra', 'formaPagamento'],
    });
    if (!pagamento) {
      throw new NotFoundException('Pagamento not found');
    }
    return pagamento;
  }

  async update(id: number, updatePagamentoDto: UpdatePagamentoDto): Promise<Pagamento> {
    const pagamento = await this.findOne(id);
    Object.assign(pagamento, updatePagamentoDto);
    return this.pagamentoRepository.save(pagamento);
  }

  async remove(id: number): Promise<void> {
    const pagamento = await this.findOne(id);
    await this.pagamentoRepository.remove(pagamento);
  }
}