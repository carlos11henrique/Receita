import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { TagService } from '../service/tag.service';
import { CreateTagDto } from '../dto/CreateTagDto';
import { UpdateTagDto } from '../dto/UpdateTagDto';

@Controller('tags')
export class TagController {
  constructor(
    private readonly tagService: TagService,
  ) {}

  @Post()
  create(
    @Body() createTagDto: CreateTagDto,
  ) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tagService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagService.update(
      id,
      updateTagDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tagService.remove(id);
  }
}