import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { ReceitaService } from '../service/receita.service';
import { CreateReceitaDto } from '../dto/CreateReceitaDto';
import { UpdateReceitaDto } from '../dto/UpdateReceitaDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('receita')
export class ReceitaController {
  constructor(private readonly receitaService: ReceitaService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: any, @Body() createReceitaDto: CreateReceitaDto) {
    const role = req.user?.role;
    if (!['affiliate', 'vendor', 'admin'].includes(role)) {
      throw new ForbiddenException('Apenas colaboradores podem criar receitas');
    }
    return this.receitaService.create(createReceitaDto, req.user.userId);
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
