import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FormaPagamentoService } from '../service/formaPagamento.service';
import { CreateFormaPagamentoDto } from '../dto/CreateFormaPagamentoDto';
import { UpdateFormaPagamentoDto } from '../dto/UpdateFormaPagamentoDto';

@Controller('forma-pagamento')
export class FormaPagamentoController {
  constructor(private readonly formaPagamentoService: FormaPagamentoService) {}

  @Post()
  create(@Body() createFormaPagamentoDto: CreateFormaPagamentoDto) {
    return this.formaPagamentoService.create(createFormaPagamentoDto);
  }

  @Get()
  findAll() {
    return this.formaPagamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.formaPagamentoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateFormaPagamentoDto: UpdateFormaPagamentoDto) {
    return this.formaPagamentoService.update(id, updateFormaPagamentoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.formaPagamentoService.remove(id);
  }
}