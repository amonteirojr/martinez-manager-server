import { DataSource } from 'typeorm';

import { ConfigService } from '../modules/config/config.service';

const config = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.envConfig.typeormHost,
  port: config.envConfig.typeormPort,
  database: config.envConfig.typeormDatabase,
  username: config.envConfig.typeormUsername,
  password: config.envConfig.typeormPassword,
  synchronize: false,
  migrationsRun: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  logging: false,
});

export default AppDataSource;
