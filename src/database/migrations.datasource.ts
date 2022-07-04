import { CreateRoleTable1652918723159 } from '../../migrations/1652918723159-CreateRoleTable';
import { CreateUsersTable1655696194528 } from '../../migrations/1655696194528-CreateUsersTable';
import { CreateStatesTable1656899728628 } from '../../migrations/1656899728628-CreateStatesTable';
import { CreateCitiesTable1656901769457 } from '../../migrations/1656901769457-CreateCitiesTable';
import { CreateCustomersTable1656901810966 } from '../../migrations/1656901810966-CreateCustomersTable';
import { CreateContractsTable1656901842840 } from '../../migrations/1656901842840-CreateContractsTable';
import { DataSource } from 'typeorm';
import { Contract } from '../modules/contract/entitites/contract.entity';
import { Customer } from '../modules/customer/entities/customer.entity';
import { Role } from '../modules/role/entities/role.entity';
import { User } from '../modules/user/entities/user.entity';
import { ConfigService } from '../modules/config/config.service';

const config = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.envConfig.typeormHost,
  port: config.envConfig.typeormPort,
  database: config.envConfig.typeormDatabase,
  username: config.envConfig.typeormUsername,
  password: config.envConfig.typeormPassword,
  entities: [User, Role, Contract, Customer],
  synchronize: false,
  migrationsRun: true,
  migrations: [
    CreateRoleTable1652918723159,
    CreateUsersTable1655696194528,
    CreateStatesTable1656899728628,
    CreateCitiesTable1656901769457,
    CreateCustomersTable1656901810966,
    CreateContractsTable1656901842840,
  ],
  logging: true,
});

export default AppDataSource;
