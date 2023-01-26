import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { IbgeSidraController } from './ibge-sidra.controller';
import { IbgeSidraService } from './ibge-sidra.service';
import { Agent } from 'https';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        timeout: 60000,
        maxRedirects: 5,
        baseURL: configService.envConfig.apiIbgeSidra,
        httpsAgent: new Agent({
          rejectUnauthorized: false,
        }),
      }),
    }),
  ],
  controllers: [IbgeSidraController],
  providers: [IbgeSidraService],
  exports: [IbgeSidraService],
})
export class IbgeSidraModule {}
