import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genero } from '../db/genero.entity';
import { GeneroService } from '../service/genero.service';
import { GeneroController } from '../controller/genero.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Genero])],
  providers: [GeneroService],
  controllers: [GeneroController],
  exports: [TypeOrmModule, GeneroService],
})
export class GeneroModule {}
