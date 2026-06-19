import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Categoria } from '../db/Categoria.entity';
import { CreateCategoriaDto } from '../dto/CreateCategoriaDto';
import { UpdateCategoriaDto } from '../dto/UpdateCategoriaDto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async create(
    createCategoriaDto: CreateCategoriaDto,
  ): Promise<Categoria> {
    const categoria =
      this.categoriaRepository.create(createCategoriaDto);

    return this.categoriaRepository.save(categoria);
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find({
      relations: ['receitas'],
    });
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: ['receitas'],
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return categoria;
  }

  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    const categoria = await this.findOne(id);

    Object.assign(categoria, updateCategoriaDto);

    return this.categoriaRepository.save(categoria);
  }

  async remove(id: number): Promise<void> {
    const categoria = await this.findOne(id);

    await this.categoriaRepository.remove(categoria);
  }
}