import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Criador } from '../db/Criador.entity';
import { CriadorService } from '../service/criador.service';
import { CriadorController } from '../controller/criador.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Criador])],
  providers: [CriadorService],
  controllers: [CriadorController],
  exports: [TypeOrmModule, CriadorService],
})
export class CriadorModule {}