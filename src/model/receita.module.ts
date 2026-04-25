import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receita } from '../db/Receita.entity';
import { Criador } from '../db/Criador.entity';
import { Genero } from '../db/genero.entity';
import { ReceitaService } from '../service/receita.service';
import { ReceitaController } from '../controller/receita.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Receita, Criador, Genero])],
  providers: [ReceitaService],
  controllers: [ReceitaController],
  exports: [TypeOrmModule, ReceitaService],
})
export class ReceitaModule {}
