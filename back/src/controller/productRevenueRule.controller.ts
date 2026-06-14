import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductRevenueRuleService } from '../service/productRevenueRule.service';
import { CreateProductRevenueRuleDto } from '../dto/CreateProductRevenueRuleDto';
import { UpdateProductRevenueRuleDto } from '../dto/UpdateProductRevenueRuleDto';

@Controller('product-revenue-rules')
export class ProductRevenueRuleController {
  constructor(private readonly productRevenueRuleService: ProductRevenueRuleService) {}

  @Post()
  create(@Body() createProductRevenueRuleDto: CreateProductRevenueRuleDto) {
    return this.productRevenueRuleService.create(createProductRevenueRuleDto);
  }

  @Get()
  findAll() {
    return this.productRevenueRuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productRevenueRuleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductRevenueRuleDto: UpdateProductRevenueRuleDto) {
    return this.productRevenueRuleService.update(id, updateProductRevenueRuleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productRevenueRuleService.remove(id);
  }
}
