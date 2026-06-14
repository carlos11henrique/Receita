import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AffiliateLinkService } from '../service/affiliateLink.service';
import { CreateAffiliateLinkDto } from '../dto/CreateAffiliateLinkDto';
import { UpdateAffiliateLinkDto } from '../dto/UpdateAffiliateLinkDto';

@Controller('affiliate-links')
export class AffiliateLinkController {
  constructor(private readonly affiliateLinkService: AffiliateLinkService) {}

  @Post()
  create(@Body() createAffiliateLinkDto: CreateAffiliateLinkDto) {
    return this.affiliateLinkService.create(createAffiliateLinkDto);
  }

  @Get()
  findAll() {
    return this.affiliateLinkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.affiliateLinkService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAffiliateLinkDto: UpdateAffiliateLinkDto) {
    return this.affiliateLinkService.update(id, updateAffiliateLinkDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.affiliateLinkService.remove(id);
  }
}
