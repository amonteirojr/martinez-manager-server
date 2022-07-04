import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10) || 5432,
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: String(process.env.TYPEORM_PASSWORD),
  entities: [__dirname + '/../**/*.entity{.js,.ts}'],
  synchronize: false,
  migrationsRun: true,
  migrations: [__dirname + '../../migrations/*{.js,.ts}'],
  logging: true,
});

export default AppDataSource;
