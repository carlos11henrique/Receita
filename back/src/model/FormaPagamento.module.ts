import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormaPagamento } from '../db/FormaPagamento.entity';
import { FormaPagamentoService } from '../service/formaPagamento.service';
import { FormaPagamentoController } from '../controller/formaPagamento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FormaPagamento])],
  providers: [FormaPagamentoService],
  controllers: [FormaPagamentoController],
  exports: [TypeOrmModule, FormaPagamentoService],
})
export class FormaPagamentoModule {}