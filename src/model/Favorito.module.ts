import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorito } from '../db/Favorito.entity';
import { User } from '../db/user.entity';
import { Receita } from '../db/Receita.entity';
import { FavoritoService } from '../service/favorito.service';
import { FavoritoController } from '../controller/favorito.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Favorito, User, Receita])],
  providers: [FavoritoService],
  controllers: [FavoritoController],
  exports: [TypeOrmModule, FavoritoService],
})
export class FavoritoModule {}