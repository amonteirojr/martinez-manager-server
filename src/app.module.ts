import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './modules/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './modules/role/role.module';
import { AppController } from './app.controller';
import { ContractModule } from './modules/contract/contract.module';
import { CustomerModule } from './modules/customer/customer.module';
import { SystemModule } from './modules/system/system.module';
import { CityModule } from './modules/city/city.module';
import { CustomerTypeModule } from './modules/customer-type/customer-type.module';
import { IbgeModule } from './modules/ibge/ibge.module';
import { IbgeSidraModule } from './modules/ibge-sidra/ibge-sidra.module';
import { MulterModule } from '@nestjs/platform-express';
import { FileModule } from './modules/file/file.module';
import { NotificationModule } from './modules/notification/notification.module';
import { SystemModuleController } from './modules/system-module/system-module.controller';
import { SystemModuleModule } from './modules/system-module/system-module.module';
import { ContractsSystemsModulesModule } from './modules/contracts-systems-modules/contracts-systems-modules.module';
import { AdmentmentModule } from './modules/admentment/admentment.module';
import { AdmentmentTypeModule } from './modules/admentment-type/admentment-type.module';
import { AdmentmentsSystemsModulesModule } from './modules/admentments-systems-modules/admentments-systems-modules.module';
import AppDataSource from './database/datasource';

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
    NotificationModule,
    SystemModuleModule,
    ContractsSystemsModulesModule,
    AdmentmentModule,
    AdmentmentTypeModule,
    AdmentmentsSystemsModulesModule,
  ],

  controllers: [AppController, SystemModuleController],
})
export class AppModule {}
