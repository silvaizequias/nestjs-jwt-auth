import { User } from '../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = {
      sub: user.id,
      username: user.username,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string) {
    let user: User;
    try {
      user = await this.usersService.findOneOurFail({
        username,
      });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(
      password,
      user.password,
    );
    if (!isPasswordValid) return null;

    return user;
  }
}
