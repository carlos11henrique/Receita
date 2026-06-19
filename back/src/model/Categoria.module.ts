import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from '../db/categoria.entity';
import { CategoriaService } from '../service/categoria.service';
import { CategoriaController } from '../controller/categoria.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  providers: [CategoriaService],
  controllers: [CategoriaController],
  exports: [TypeOrmModule, CategoriaService],
})
export class CategoriaModule {}
