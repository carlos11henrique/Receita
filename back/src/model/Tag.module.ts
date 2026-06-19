import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tag } from '../db/Tag.entity';
import { TagService } from '../service/tag.service';
import { TagController } from '../controller/tag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  providers: [TagService],
  controllers: [TagController],
  exports: [TypeOrmModule, TagService],
})
export class TagModule {}