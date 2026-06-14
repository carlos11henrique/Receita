import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorito } from '../db/Favorito.entity';
import { User } from '../db/user.entity';
import { Receita } from '../db/Receita.entity';
import { CreateFavoritoDto } from '../dto/CreateFavoritoDto';
import { UpdateFavoritoDto } from '../dto/UpdateFavoritoDto';

@Injectable()
export class FavoritoService {
  constructor(
    @InjectRepository(Favorito)
    private favoritoRepository: Repository<Favorito>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Receita)
    private receitaRepository: Repository<Receita>,
  ) {}

  async create(createFavoritoDto: CreateFavoritoDto): Promise<Favorito> {
    const { usuarioId, receitaId } = createFavoritoDto;

    const usuario = await this.userRepository.findOne({ where: { id: usuarioId } });
    if (!usuario) {
      throw new NotFoundException('User not found');
    }

    const receita = await this.receitaRepository.findOne({ where: { id: receitaId } });
    if (!receita) {
      throw new NotFoundException('Receita not found');
    }

    const favorito = this.favoritoRepository.create({
      usuario,
      receita,
    });

    return this.favoritoRepository.save(favorito);
  }

  async findAll(): Promise<Favorito[]> {
    return this.favoritoRepository.find({
      relations: ['usuario', 'receita'],
    });
  }

  async findOne(id: number): Promise<Favorito> {
    const favorito = await this.favoritoRepository.findOne({
      where: { id },
      relations: ['usuario', 'receita'],
    });
    if (!favorito) {
      throw new NotFoundException('Favorito not found');
    }
    return favorito;
  }

  async update(id: number, updateFavoritoDto: UpdateFavoritoDto): Promise<Favorito> {
    const favorito = await this.findOne(id);
    Object.assign(favorito, updateFavoritoDto);
    return this.favoritoRepository.save(favorito);
  }

  async remove(id: number): Promise<void> {
    const favorito = await this.findOne(id);
    await this.favoritoRepository.remove(favorito);
  }
}