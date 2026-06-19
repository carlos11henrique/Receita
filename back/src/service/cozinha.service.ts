import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cozinha } from '../db/cozinha.entity';
import { CreateCozinhaDto } from '../dto/CreateCozinhaDto';
import { UpdateCozinhaDto } from '../dto/UpdateCozinhaDto';

@Injectable()
export class CozinhaService {
  constructor(
    @InjectRepository(Cozinha)
    private cozinhaRepository: Repository<Cozinha>,
  ) {}

  async create(
    createCozinhaDto: CreateCozinhaDto,
  ): Promise<Cozinha> {
    const cozinha =
      this.cozinhaRepository.create(createCozinhaDto);

    return this.cozinhaRepository.save(cozinha);
  }

  async findAll(): Promise<Cozinha[]> {
    return this.cozinhaRepository.find({
      relations: ['receitas'],
    });
  }

  async findOne(id: number): Promise<Cozinha> {
    const cozinha = await this.cozinhaRepository.findOne({
      where: { id },
      relations: ['receitas'],
    });

    if (!cozinha) {
      throw new NotFoundException('Cozinha não encontrada');
    }

    return cozinha;
  }

  async update(
    id: number,
    updateCozinhaDto: UpdateCozinhaDto,
  ): Promise<Cozinha> {
    const cozinha = await this.findOne(id);

    Object.assign(cozinha, updateCozinhaDto);

    return this.cozinhaRepository.save(cozinha);
  }

  async remove(id: number): Promise<void> {
    const cozinha = await this.findOne(id);

    await this.cozinhaRepository.remove(cozinha);
  }
}