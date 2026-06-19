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

import { CozinhaService } from '../service/cozinha.service';
import { CreateCozinhaDto } from '../dto/CreateCozinhaDto';
import { UpdateCozinhaDto } from '../dto/UpdateCozinhaDto';

@Controller('cozinhas')
export class CozinhaController {
  constructor(
    private readonly cozinhaService: CozinhaService,
  ) {}

  @Post()
  create(
    @Body() createCozinhaDto: CreateCozinhaDto,
  ) {
    return this.cozinhaService.create(createCozinhaDto);
  }

  @Get()
  findAll() {
    return this.cozinhaService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cozinhaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCozinhaDto: UpdateCozinhaDto,
  ) {
    return this.cozinhaService.update(
      id,
      updateCozinhaDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cozinhaService.remove(id);
  }
}