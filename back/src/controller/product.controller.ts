import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../dto/CreateProductDto';
import { UpdateProductDto } from '../dto/UpdateProductDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req: any, @Body() createProductDto: CreateProductDto) {
    try {
      createProductDto.creatorId = req.user?.userId;
    } catch (e) {
      // ignore if not available
    }

    createProductDto.status = 'pending';

    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('moderation/pending')
  async pending(@Request() req: any) {
    if (req.user?.role !== 'admin') {
      throw new ForbiddenException('Acesso negado');
    }
    return this.productService.findByStatus('pending');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/moderate')
  async moderate(@Request() req: any, @Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    if (req.user?.role !== 'admin') {
      throw new ForbiddenException('Acesso negado');
    }
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
