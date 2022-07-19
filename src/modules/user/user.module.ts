import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { RoleModule } from '../role/role.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    RoleModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.envConfig.jwtSecret,
        signOptions: {
          expiresIn: configService.envConfig.jwtSecretExpirationTime,
        },
      }),
    }),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
