import { Module } from '@nestjs/common';
import { IbgeService } from './ibge.service';
import { IbgeController } from './ibge.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        timeout: 60000,
        maxRedirects: 5,
        baseURL: configService.envConfig.apiIbgeLocalidades,
      }),
    }),
  ],
  controllers: [IbgeController],
  providers: [IbgeService],
  exports: [IbgeService],
})
export class IbgeModule {}
