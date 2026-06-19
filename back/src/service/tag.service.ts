import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tag } from '../db/tag.entity';
import { CreateTagDto } from '../dto/CreateTagDto';
import { UpdateTagDto } from '../dto/UpdateTagDto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = this.tagRepository.create(createTagDto);

    return this.tagRepository.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find({
      relations: ['receitas'],
    });
  }

  async findOne(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({
      where: { id },
      relations: ['receitas'],
    });

    if (!tag) {
      throw new NotFoundException('Tag não encontrada');
    }

    return tag;
  }

  async update(
    id: number,
    updateTagDto: UpdateTagDto,
  ): Promise<Tag> {
    const tag = await this.findOne(id);

    Object.assign(tag, updateTagDto);

    return this.tagRepository.save(tag);
  }

  async remove(id: number): Promise<void> {
    const tag = await this.findOne(id);

    await this.tagRepository.remove(tag);
  }
}