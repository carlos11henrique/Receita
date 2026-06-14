import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Criador } from '../db/Criador.entity';
import { CreateCriadorDto } from '../dto/CreateCriadorDto';
import { UpdateCriadorDto } from '../dto/UpdateCriadorDto';

@Injectable()
export class CriadorService {
  constructor(
    @InjectRepository(Criador)
    private criadorRepository: Repository<Criador>,
  ) {}

  async create(createCriadorDto: CreateCriadorDto): Promise<Criador> {
    const criador = this.criadorRepository.create(createCriadorDto);
    return this.criadorRepository.save(criador);
  }

  async findAll(): Promise<Criador[]> {
    return this.criadorRepository.find({
      relations: ['receitas'],
    });
  }

  async findOne(id: number): Promise<Criador> {
    const criador = await this.criadorRepository.findOne({
      where: { id },
      relations: ['receitas'],
    });
    if (!criador) {
      throw new NotFoundException('Criador not found');
    }
    return criador;
  }

  async update(id: number, updateCriadorDto: UpdateCriadorDto): Promise<Criador> {
    const criador = await this.findOne(id);
    Object.assign(criador, updateCriadorDto);
    return this.criadorRepository.save(criador);
  }

  async remove(id: number): Promise<void> {
    const criador = await this.findOne(id);
    await this.criadorRepository.remove(criador);
  }
}