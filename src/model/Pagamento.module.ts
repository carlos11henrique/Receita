import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamento } from '../db/Pagamento.entity';
import { Compra } from '../db/Compra.entity';
import { FormaPagamento } from '../db/FormaPagamento.entity';
import { PagamentoService } from '../service/pagamento.service';
import { PagamentoController } from '../controller/pagamento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamento, Compra, FormaPagamento])],
  providers: [PagamentoService],
  controllers: [PagamentoController],
  exports: [TypeOrmModule, PagamentoService],
})
export class PagamentoModule {}