import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './modules/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './modules/config/config.service';
import { RoleModule } from './modules/role/role.module';
import { AppController } from './app.controller';
import { ContractModule } from './modules/contract/contract.module';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    UserModule,
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
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: false,
        migrationsRun: true,
        migrations: [__dirname + '/migrations/*{.js,.ts}'],
        cli: {
          migrationsDir: __dirname + '/migrations',
        },
      }),
    }),
    RoleModule,
    ContractModule,
    CustomerModule,
  ],

  controllers: [AppController],
})
export class AppModule {}
