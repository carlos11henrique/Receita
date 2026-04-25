import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReceitaService } from '../service/receita.service';
import { CreateReceitaDto } from '../dto/CreateReceitaDto';
import { UpdateReceitaDto } from '../dto/UpdateReceitaDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('receita')
export class ReceitaController {
  constructor(private readonly receitaService: ReceitaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createReceitaDto: CreateReceitaDto) {
    return this.receitaService.create(createReceitaDto);
  }

  @Get()
  findAll() {
    return this.receitaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.receitaService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReceitaDto: UpdateReceitaDto) {
    return this.receitaService.update(id, updateReceitaDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.receitaService.remove(id);
  }
}
