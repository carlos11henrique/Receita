import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cozinha } from '../db/cozinha.entity';
import { CozinhaService } from '../service/cozinha.service';
import { CozinhaController } from '../controller/cozinha.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cozinha])],
  providers: [CozinhaService],
  controllers: [CozinhaController],
  exports: [TypeOrmModule, CozinhaService],
})
export class CozinhaModule {}