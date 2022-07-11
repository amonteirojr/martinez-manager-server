import { DataSource } from 'typeorm';

import { CreateRoleTable1652918723159 } from '../../migrations/1652918723159-CreateRoleTable';
import { CreateUsersTable1655696194528 } from '../../migrations/1655696194528-CreateUsersTable';
import { CreateCitiesTable1656901769457 } from '../../migrations/1656901769457-CreateCitiesTable';
import { CreateCustomersTable1656901810966 } from '../../migrations/1656901810966-CreateCustomersTable';
import { CreateContractsTable1656901842840 } from '../../migrations/1656901842840-CreateContractsTable';
import { CreateSystemsTable1657162257652 } from '../../migrations/1657162257652-CreateSystemsTable';
import { CreateContractsSystemsTable1657162689496 } from '../../migrations/1657162689496-CreateContractsSystemsTable';

import { System } from '../modules/system/entities/system.entity';
import { Contract } from '../modules/contract/entitites/contract.entity';
import { Customer } from '../modules/customer/entities/customer.entity';
import { Role } from '../modules/role/entities/role.entity';
import { User } from '../modules/user/entities/user.entity';

import { ConfigService } from '../modules/config/config.service';
import { City } from '../modules/city/entities/city.entity';
import { CreateCustomerTypesTable1657505608590 } from '../../migrations/1657505608590-CreateCustomerTypesTable';
import { AlterTableCustomersAddTypeId1657505910089 } from '../../migrations/1657505910089-AlterTableCustomersAddTypeId';
import { CustomerType } from 'src/modules/customer-type/entities/customer-type.entity';

const config = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.envConfig.typeormHost,
  port: config.envConfig.typeormPort,
  database: config.envConfig.typeormDatabase,
  username: config.envConfig.typeormUsername,
  password: config.envConfig.typeormPassword,
  entities: [User, Role, Contract, Customer, System, City, CustomerType],
  synchronize: false,
  migrationsRun: true,
  migrations: [
    CreateRoleTable1652918723159,
    CreateUsersTable1655696194528,
    CreateCitiesTable1656901769457,
    CreateCustomersTable1656901810966,
    CreateContractsTable1656901842840,
    CreateSystemsTable1657162257652,
    CreateContractsSystemsTable1657162689496,
    CreateCustomerTypesTable1657505608590,
    AlterTableCustomersAddTypeId1657505910089,
  ],
  logging: false,
});

export default AppDataSource;
