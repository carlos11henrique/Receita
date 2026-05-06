import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receita } from '../db/Receita.entity';
import { Criador } from '../db/Criador.entity';
import { Genero } from '../db/genero.entity';
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
    @InjectRepository(Genero)
    private generoRepository: Repository<Genero>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createReceitaDto: CreateReceitaDto, userId: number): Promise<Receita> {
    const { criadorId, categoriasIds, ...receitaData } = createReceitaDto;

    let criador: Criador | null = null;
    if (criadorId !== undefined && criadorId !== null) {
      criador = await this.criadorRepository.findOne({ where: { id: criadorId } });
      if (!criador) {
        throw new NotFoundException('Criador not found');
      }
    } else {
      criador = await this.findOrCreateCriadorForUser(userId);
    }

    let categorias: Genero[] = [];
    if (categoriasIds && categoriasIds.length > 0) {
      categorias = await this.generoRepository.findByIds(categoriasIds);
    }

    const receita = this.receitaRepository.create({
      ...receitaData,
      criador,
      categorias,
    });

    return this.receitaRepository.save(receita);
  }

  private async findOrCreateCriadorForUser(userId: number): Promise<Criador> {
    let criador = await this.criadorRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!criador) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
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
      relations: ['criador', 'categorias'],
    });
  }

  async findOne(id: number): Promise<Receita> {
    const receita = await this.receitaRepository.findOne({
      where: { id },
      relations: ['criador', 'categorias'],
    });
    if (!receita) {
      throw new NotFoundException('Receita not found');
    }
    return receita;
  }

  async update(id: number, updateReceitaDto: UpdateReceitaDto): Promise<Receita> {
    const receita = await this.findOne(id);
    const { criadorId, categoriasIds, ...receitaData } = updateReceitaDto;

    if (criadorId !== undefined) {
      const criador = await this.criadorRepository.findOne({ where: { id: criadorId } });
      if (!criador) {
        throw new NotFoundException('Criador not found');
      }
      receita.criador = criador;
    }

    if (categoriasIds !== undefined) {
      receita.categorias = await this.generoRepository.findByIds(categoriasIds);
    }

    Object.assign(receita, receitaData);
    return this.receitaRepository.save(receita);
  }

  async remove(id: number): Promise<void> {
    const receita = await this.findOne(id);
    await this.receitaRepository.remove(receita);
  }
}