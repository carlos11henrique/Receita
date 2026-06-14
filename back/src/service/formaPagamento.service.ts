import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormaPagamento } from '../db/FormaPagamento.entity';
import { CreateFormaPagamentoDto } from '../dto/CreateFormaPagamentoDto';
import { UpdateFormaPagamentoDto } from '../dto/UpdateFormaPagamentoDto';

@Injectable()
export class FormaPagamentoService {
  constructor(
    @InjectRepository(FormaPagamento)
    private formaPagamentoRepository: Repository<FormaPagamento>,
  ) {}

  async create(createFormaPagamentoDto: CreateFormaPagamentoDto): Promise<FormaPagamento> {
    const formaPagamento = this.formaPagamentoRepository.create(createFormaPagamentoDto);
    return this.formaPagamentoRepository.save(formaPagamento);
  }

  async findAll(): Promise<FormaPagamento[]> {
    return this.formaPagamentoRepository.find({
      relations: ['pagamentos'],
    });
  }

  async findOne(id: number): Promise<FormaPagamento> {
    const formaPagamento = await this.formaPagamentoRepository.findOne({
      where: { id },
      relations: ['pagamentos'],
    });
    if (!formaPagamento) {
      throw new NotFoundException('FormaPagamento not found');
    }
    return formaPagamento;
  }

  async update(id: number, updateFormaPagamentoDto: UpdateFormaPagamentoDto): Promise<FormaPagamento> {
    const formaPagamento = await this.findOne(id);
    Object.assign(formaPagamento, updateFormaPagamentoDto);
    return this.formaPagamentoRepository.save(formaPagamento);
  }

  async remove(id: number): Promise<void> {
    const formaPagamento = await this.findOne(id);
    await this.formaPagamentoRepository.remove(formaPagamento);
  }
}