import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AffiliateCommissionService } from '../service/affiliateCommission.service';
import { CreateAffiliateCommissionDto } from '../dto/CreateAffiliateCommissionDto';
import { UpdateAffiliateCommissionDto } from '../dto/UpdateAffiliateCommissionDto';

@Controller('affiliate-commissions')
export class AffiliateCommissionController {
  constructor(private readonly affiliateCommissionService: AffiliateCommissionService) {}

  @Post()
  create(@Body() createAffiliateCommissionDto: CreateAffiliateCommissionDto) {
    return this.affiliateCommissionService.create(createAffiliateCommissionDto);
  }

  @Get()
  findAll() {
    return this.affiliateCommissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.affiliateCommissionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAffiliateCommissionDto: UpdateAffiliateCommissionDto) {
    return this.affiliateCommissionService.update(id, updateAffiliateCommissionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.affiliateCommissionService.remove(id);
  }
}
