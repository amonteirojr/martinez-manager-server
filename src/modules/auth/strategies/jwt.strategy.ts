import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.jwtSecret,
    });
  }

  async validate(payload: any) {
    const { email } = payload;
    const user = await this.userService.findByEmailForLogin(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return { id: user.userId, email: user.email, role: user.role.name };
  }
}
