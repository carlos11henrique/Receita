import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../service/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) return null;

    const now = new Date();
    if (user.isBanned && (!user.banUntil || new Date(user.banUntil) > now)) {
      throw new UnauthorizedException('Usuário banido');
    }

    if (user.isBanned && user.banUntil && new Date(user.banUntil) <= now) {
      await this.userService.update(user.id, { isBanned: false, banUntil: null });
      user.isBanned = false;
      user.banUntil = null;
    }

    if (await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const { password, ...userWithoutPassword } = user;
    const payload = {
      email: userWithoutPassword.email,
      sub: userWithoutPassword.id,
      role: userWithoutPassword.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }
}