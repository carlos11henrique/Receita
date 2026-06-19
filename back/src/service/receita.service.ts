import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Receita } from '../db/Receita.entity';
import { Criador } from '../db/Criador.entity';
import { Categoria } from '../db/Categoria.entity';
import { Cozinha } from '../db/Cozinha.entity';
import { Tag } from '../db/Tag.entity';
import { User } from '../db/user.entity';

import { CreateReceitaDto } from '../dto/CreateReceitaDto';
import { UpdateReceitaDto } from '../dto/UpdateReceitaDto';

@Injectable()
export class ReceitaService {
  constructor(
    @InjectRepository(Receita)
    private receitaRepository: Repository<Receita>,

    @InjectRepository(Criador)
    private criadorRepository: Repository<Criador>,

    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,

    @InjectRepository(Cozinha)
    private cozinhaRepository: Repository<Cozinha>,

    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createReceitaDto: CreateReceitaDto,
    userId: number,
  ): Promise<Receita> {
    const {
      criadorId,
      categoriasIds,
      cozinhasIds,
      tagsIds,
      ...receitaData
    } = createReceitaDto;

    let criador: Criador | null = null;

    if (criadorId !== undefined && criadorId !== null) {
      criador = await this.criadorRepository.findOne({
        where: { id: criadorId },
      });

      if (!criador) {
        throw new NotFoundException('Criador not found');
      }
    } else {
      criador = await this.findOrCreateCriadorForUser(userId);
    }

    const categorias =
      categoriasIds && categoriasIds.length > 0
        ? await this.categoriaRepository.find({
            where: {
              id: In(categoriasIds),
            },
          })
        : [];

    const cozinhas =
      cozinhasIds && cozinhasIds.length > 0
        ? await this.cozinhaRepository.find({
            where: {
              id: In(cozinhasIds),
            },
          })
        : [];

    const tags =
      tagsIds && tagsIds.length > 0
        ? await this.tagRepository.find({
            where: {
              id: In(tagsIds),
            },
          })
        : [];

    const receita = this.receitaRepository.create({
      ...receitaData,
      criador,
      categorias,
      cozinhas,
      tags,
    });

    return this.receitaRepository.save(receita);
  }

  private async findOrCreateCriadorForUser(
    userId: number,
  ): Promise<Criador> {
    let criador = await this.criadorRepository.findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['user'],
    });

    if (!criador) {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      criador = this.criadorRepository.create({
        nome: user.name,
        descricao: `Colaborador ${user.name}`,
        user,
      });

      await this.criadorRepository.save(criador);
    }

    return criador;
  }

  async findAll(): Promise<Receita[]> {
    return this.receitaRepository.find({
      relations: [
        'criador',
        'categorias',
        'cozinhas',
        'tags',
      ],
    });
  }

  async findOne(id: number): Promise<Receita> {
    const receita = await this.receitaRepository.findOne({
      where: { id },
      relations: [
        'criador',
        'categorias',
        'cozinhas',
        'tags',
      ],
    });

    if (!receita) {
      throw new NotFoundException('Receita not found');
    }

    return receita;
  }

  async update(
    id: number,
    updateReceitaDto: UpdateReceitaDto,
  ): Promise<Receita> {
    const receita = await this.findOne(id);

    const {
      criadorId,
      categoriasIds,
      cozinhasIds,
      tagsIds,
      ...receitaData
    } = updateReceitaDto;

    if (criadorId !== undefined) {
      const criador = await this.criadorRepository.findOne({
        where: { id: criadorId },
      });

      if (!criador) {
        throw new NotFoundException('Criador not found');
      }

      receita.criador = criador;
    }

    if (categoriasIds !== undefined) {
      receita.categorias = await this.categoriaRepository.find({
        where: {
          id: In(categoriasIds),
        },
      });
    }

    if (cozinhasIds !== undefined) {
      receita.cozinhas = await this.cozinhaRepository.find({
        where: {
          id: In(cozinhasIds),
        },
      });
    }

    if (tagsIds !== undefined) {
      receita.tags = await this.tagRepository.find({
        where: {
          id: In(tagsIds),
        },
      });
    }

    Object.assign(receita, receitaData);

    return this.receitaRepository.save(receita);
  }

  async remove(id: number): Promise<void> {
    const receita = await this.findOne(id);

    await this.receitaRepository.remove(receita);
  }
}