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

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => AppDataSource.options,
    }),
    RoleModule,
    ContractModule,
    CustomerModule,
  ],

  controllers: [AppController],
})
export class AppModule {}
