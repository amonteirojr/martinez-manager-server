import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { userId, email, roles, firstname, lastname } = user;
      return { userId, email, roles, firstname, lastname };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      ...user,
    };
  }

  decode(accessToken: string) {
    accessToken = accessToken.split('Bearer ').pop();
    return this.jwtService.decode(accessToken, { json: true });
  }
}
