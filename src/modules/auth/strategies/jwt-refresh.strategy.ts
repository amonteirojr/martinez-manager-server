import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { ConfigService } from 'src/modules/config/config.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: configService.envConfig.refreshTokenSecret,
    });
  }

  async validate(payload: any) {
    const { email } = payload;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return { id: user.userId, email: user.email, role: user.role.name };
  }
}
