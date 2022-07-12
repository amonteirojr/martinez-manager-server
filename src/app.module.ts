import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './modules/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './modules/role/role.module';
import { AppController } from './app.controller';
import { ContractModule } from './modules/contract/contract.module';
import { CustomerModule } from './modules/customer/customer.module';
import AppDataSource from './database/migrations.datasource';
import { SystemModule } from './modules/system/system.module';
import { CityModule } from './modules/city/city.module';
import { CustomerTypeModule } from './modules/customer-type/customer-type.module';
import { IbgeModule } from './modules/ibge/ibge.module';
import { IbgeSidraModule } from './modules/ibge-sidra/ibge-sidra.module';
import { MulterModule } from '@nestjs/platform-express';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => AppDataSource.options,
    }),
    AuthModule,
    ConfigModule,
    UserModule,
    RoleModule,
    ContractModule,
    CustomerModule,
    SystemModule,
    CityModule,
    CustomerTypeModule,
    IbgeModule,
    IbgeSidraModule,
    FileModule,
  ],

  controllers: [AppController],
})
export class AppModule {}
