import { ContractsSystemsModule } from './modules/contracts-systems/contracts-systems.module';
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
import { SystemModuleModule } from './modules/system-module/system-module.module';
import { ContractsSystemsModulesModule } from './modules/contracts-systems-modules/contracts-systems-modules.module';
import { AdmentmentModule } from './modules/admentment/admentment.module';
import { AdmentmentTypeModule } from './modules/admentment-type/admentment-type.module';
import { AdmentmentsSystemsModulesModule } from './modules/admentments-systems-modules/admentments-systems-modules.module';

import AppDataSource from './database/datasource';
import { PaymentModeModule } from './modules/payment-mode/payment-mode.module';
import { BiddingModalityModule } from './modules/bidding-modality/bidding-modality.module';
import { LawModule } from './modules/law/law.module';
import { LawArticleModule } from './modules/law-article/law-article.module';
import { ResponsibleModule } from './modules/responsible/responsible.module';

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
    PaymentModeModule,
    BiddingModalityModule,
    LawModule,
    LawArticleModule,
    ContractsSystemsModule,
    ResponsibleModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
