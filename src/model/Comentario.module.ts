import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from '../db/Comentario.entity';
import { User } from '../db/user.entity';
import { Receita } from '../db/Receita.entity';
import { ComentarioService } from '../service/comentario.service';
import { ComentarioController } from '../controller/comentario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comentario, User, Receita])],
  providers: [ComentarioService],
  controllers: [ComentarioController],
  exports: [TypeOrmModule, ComentarioService],
})
export class ComentarioModule {}