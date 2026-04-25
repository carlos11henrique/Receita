import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comentario } from '../db/Comentario.entity';
import { User } from '../db/user.entity';
import { Receita } from '../db/Receita.entity';
import { CreateComentarioDto } from '../dto/CreateComentarioDto';
import { UpdateComentarioDto } from '../dto/UpdateComentarioDto';

@Injectable()
export class ComentarioService {
  constructor(
    @InjectRepository(Comentario)
    private comentarioRepository: Repository<Comentario>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Receita)
    private receitaRepository: Repository<Receita>,
  ) {}

  async create(createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    const { usuarioId, receitaId, ...comentarioData } = createComentarioDto;

    const usuario = await this.userRepository.findOne({ where: { id: usuarioId } });
    if (!usuario) {
      throw new NotFoundException('User not found');
    }

    const receita = await this.receitaRepository.findOne({ where: { id: receitaId } });
    if (!receita) {
      throw new NotFoundException('Receita not found');
    }

    const comentario = this.comentarioRepository.create({
      ...comentarioData,
      usuario,
      receita,
    });

    return this.comentarioRepository.save(comentario);
  }

  async findAll(): Promise<Comentario[]> {
    return this.comentarioRepository.find({
      relations: ['usuario', 'receita'],
    });
  }

  async findOne(id: number): Promise<Comentario> {
    const comentario = await this.comentarioRepository.findOne({
      where: { id },
      relations: ['usuario', 'receita'],
    });
    if (!comentario) {
      throw new NotFoundException('Comentario not found');
    }
    return comentario;
  }

  async update(id: number, updateComentarioDto: UpdateComentarioDto): Promise<Comentario> {
    const comentario = await this.findOne(id);
    Object.assign(comentario, updateComentarioDto);
    return this.comentarioRepository.save(comentario);
  }

  async remove(id: number): Promise<void> {
    const comentario = await this.findOne(id);
    await this.comentarioRepository.remove(comentario);
  }
}