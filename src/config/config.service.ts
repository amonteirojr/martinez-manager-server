import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { validateSync } from 'class-validator';
import * as dotenv from 'dotenv';
import { ConfigEnv, NodeEnv } from './config-env.model';

@Injectable()
export class ConfigService implements OnModuleInit {
  private readonly logger = new Logger(ConfigService.name);

  readonly envConfig: ConfigEnv;

  constructor() {
    if (process.env.NODE_ENV !== NodeEnv.Test) {
      dotenv.config();
    }
    try {
      this.envConfig = this.validateInput(process.env);
    } catch (err) {
      this.logger.error(err.toString());
      throw err;
    }
  }

  onModuleInit() {
    this.logger.log('Env config is successfully initialized');
  }

  protected initEnvConfig(config: any): ConfigEnv {
    const envConfig = new ConfigEnv();
    envConfig.httpPort = parseInt(config.HTTP_PORT, 10);
    envConfig.nodeEnv = config.NODE_ENV;

    envConfig.typeormHost = config.TYPEORM_HOST;
    envConfig.typeormPort = parseInt(config.TYPEORM_PORT, 10) || 5432;
    envConfig.typeormDatabase = config.TYPEORM_DATABASE;
    envConfig.typeormUsername = config.TYPEORM_USERNAME;
    envConfig.typeormPassword = config.TYPEORM_PASSWORD;
    envConfig.typeormConnection = config.TYPEORM_CONNECTION;

    return envConfig;
  }

  private validateInput(config: any): ConfigEnv {
    const envConfig = this.initEnvConfig(config);
    const errors = validateSync(envConfig);
    if (errors.length) {
      throw errors.pop();
    }
    return envConfig;
  }
}
