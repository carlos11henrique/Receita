import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CriadorService } from '../service/criador.service';
import { CreateCriadorDto } from '../dto/CreateCriadorDto';
import { UpdateCriadorDto } from '../dto/UpdateCriadorDto';

@Controller('criador')
export class CriadorController {
  constructor(private readonly criadorService: CriadorService) {}

  @Post()
  create(@Body() createCriadorDto: CreateCriadorDto) {
    return this.criadorService.create(createCriadorDto);
  }

  @Get()
  findAll() {
    return this.criadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.criadorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCriadorDto: UpdateCriadorDto) {
    return this.criadorService.update(id, updateCriadorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.criadorService.remove(id);
  }
}