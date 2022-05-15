import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessGroupModule } from './access-group/access-group.module';
import { User } from './user/entities/user.entity';
import { ConfigService } from './config/config.service';
import { CreateUserTable1652583952286 } from 'migrations/1652583952286-CreateUserTable';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.envConfig.typeormConnection,
        host: configService.envConfig.typeormHost,
        port: configService.envConfig.typeormPort,
        database: configService.envConfig.typeormDatabase,
        username: configService.envConfig.typeormUsername,
        password: configService.envConfig.typeormPassword,
        url: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        entities: [User],
        synchronize: false,
        migrationsRun: true,
        migrations: [CreateUserTable1652583952286],
      }),
    }),
    AccessGroupModule,
    ConfigModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
