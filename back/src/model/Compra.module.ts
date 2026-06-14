import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compra } from '../db/Compra.entity';
import { User } from '../db/user.entity';
import { Receita } from '../db/Receita.entity';
import { Pagamento } from '../db/Pagamento.entity';
import { CompraService } from '../service/compra.service';
import { CompraController } from '../controller/compra.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Compra, User, Receita, Pagamento])],
  providers: [CompraService],
  controllers: [CompraController],
  exports: [TypeOrmModule, CompraService],
})
export class CompraModule {}