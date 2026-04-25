import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avaliacao } from '../db/Avaliacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Avaliacao])],
  exports: [TypeOrmModule],
})
export class AvaliacaoModule {}