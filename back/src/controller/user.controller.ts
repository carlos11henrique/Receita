import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/CreateUserDto';
import { UpdateUserDto } from '../dto/UpdateUserDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    if (req.user?.role !== 'admin') {
      throw new ForbiddenException('Acesso negado');
    }
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    if (req.user?.role !== 'admin' && req.user?.userId !== id) {
      throw new ForbiddenException('Acesso negado');
    }
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Request() req: any, @Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    if (req.user?.role !== 'admin' && req.user?.userId !== id) {
      throw new ForbiddenException('Acesso negado');
    }

    if (req.user?.role !== 'admin' && (updateUserDto.role || updateUserDto.isBanned !== undefined || updateUserDto.banUntil)) {
      throw new ForbiddenException('Apenas administradores podem alterar função ou banimento');
    }

    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}