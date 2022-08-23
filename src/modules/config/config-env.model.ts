import {
  IsString,
  IsNumber,
  IsPositive,
  IsEnum,
  IsUrl,
  IsEmail,
} from 'class-validator';

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

  @IsString()
  typeormEntitiesDir: string;

  @IsString()
  typeormMigrations: string;

  @IsString()
  typeormMigrationsDir: string;

  @IsUrl()
  apiIbgeSidra: string;

  @IsUrl()
  apiIbgeLocalidades: string;

  @IsString()
  sendingblueApiKey: string;

  @IsUrl()
  sendingblueApiUrl: string;

  @IsEmail()
  senderEmail: string;

  @IsString()
  senderName: string;

  @IsString()
  appUrl: string;

  @IsString()
  appResetPasswordPath: string;

  @IsString()
  jwtSecret: string;

  @IsString()
  refreshTokenSecret: string;

  @IsString()
  jwtSecretExpirationTime: string;

  @IsString()
  jwtRefreshExpirationTime: string;

  @IsString()
  hashKey: string;

  get isProduction(): boolean {
    return this.nodeEnv === NodeEnv.Production;
  }
}
