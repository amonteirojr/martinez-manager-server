import { IsString, IsNumber, IsPositive, IsEnum, IsUrl } from 'class-validator';

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class ConfigEnv {
  @IsNumber()
  @IsPositive()
  httpPort: number;

  @IsString()
  @IsEnum(NodeEnv)
  nodeEnv: string;

  @IsString()
  typeormHost: string;

  @IsNumber()
  @IsPositive()
  typeormPort: number;

  @IsString()
  typeormUsername: string;

  @IsString()
  typeormPassword: string;

  @IsString()
  typeormDatabase: string;

  @IsString()
  typeormConnection: 'postgres';

  @IsString()
  typeormEntities: string;

  @IsUrl()
  apiIbgeSidra: string;

  @IsUrl()
  apiIbgeLocalidades: string;

  @IsString()
  sendingblueApiKey: string;

  @IsUrl()
  sendingblueApiUrl: string;

  @IsString()
  hashKey: string;

  get isProduction(): boolean {
    return this.nodeEnv === NodeEnv.Production;
  }
}
