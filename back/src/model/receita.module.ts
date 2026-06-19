import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Receita } from '../db/Receita.entity';
import { Criador } from '../db/Criador.entity';
import { Categoria } from '../db/categoria.entity';
import { Cozinha } from '../db/cozinha.entity';
import { Tag } from '../db/tag.entity';
import { User } from '../db/user.entity';

import { ReceitaService } from '../service/receita.service';
import { ReceitaController } from '../controller/receita.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Receita,
      Criador,
      Categoria,
      Cozinha,
      Tag,
      User,
    ]),
  ],
  providers: [ReceitaService],
  controllers: [ReceitaController],
  exports: [TypeOrmModule, ReceitaService],
})
export class ReceitaModule {}