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
import { CustomerType } from '../modules/customer-type/entities/customer-type.entity';
import { File } from '../modules/file/entitites/file.entity';
import { CreateFilesTable1657603283224 } from '../../migrations/1657603283224-CreateFilesTable';
import { AlterTableCustomersAddCNPJ1657647940065 } from '../../migrations/1657647940065-AlterTableCustomersAddCNPJ';
import { AlterTableFilesAddOriginalname1657764395639 } from '../../migrations/1657764395639-AlterTableFilesAddOriginalname';
import { AlterTableCustomersAddColumns1658195518592 } from '../../migrations/1658195518592-AlterTableCustomersAddColumns';
import { CreateTableModules1658278152104 } from '../../migrations/1658278152104-CreateTableModules';
import { SystemModule } from '../modules/system-module/entities/system-module.entity';
import { ContractsSystemsModules } from '../modules/contracts-systems-modules/entities/contracts-systems-modules.entity';
import { PopulateRolesTable1658979591363 } from '../../migrations/1658979591363-PopulateRolesTable';
import { Admentment } from '../modules/admentment/entities/admentment.entity';
import { AdmentmentType } from '../modules/admentment-type/entities/admentment-type.entity';
import { CreateAmendmentTable1659043863056 } from '../../migrations/1659043863056-CreateAmendmentTable';
import { CreateAdmentmentsSystemsTable1659046086941 } from '../../migrations/1659046086941-CreateAdmentmentsSystemsTable';
import { CreateAdmentmentsTypeTable1659046234298 } from '../../migrations/1659046234298-CreateAdmentmentsTypeTable';
import { AddAdmentmentsTypeForeignKey1659046324211 } from '../../migrations/1659046324211-AddAdmentmentsTypeForeignKey';
import { AlterTableContractsAddColums1659539993636 } from '../../migrations/1659539993636-AlterTableContractsAddColums';
import { AlterTableAdmentmentsAddDeleteColumn1659668656838 } from '../../migrations/1659668656838-AlterTableAdmentmentsAddDeleteColumn';
import { AdmentmentsSystemsModules } from '../modules/admentments-systems-modules/entities/admentments-systems-modules.entity';
import { AlterTableFilesAddColumns1659672244685 } from '../../migrations/1659672244685-AlterTableFilesAddColumns';
import { CreatePaymentModesTable1660876780242 } from '../../migrations/1660876780242-CreatePaymentModesTable';
import { AlterTableContractAlterColumnPaymentMode1660876942428 } from '../../migrations/1660876942428-AlterTableContractAlterColumnPaymentMode';
import { PaymentMode } from '../modules/payment-mode/entities/payment-mode.entity';
import { AlterTableSystemModulesAlterRequiredColumns1660883251838 } from '../../migrations/1660883251838-AlterTableSystemModulesAlterRequiredColumns';
import { BiddingModality } from '../modules/bidding-modality/entities/bidding-modality.entity';
import { CreateTableBiddingModalities1660885016467 } from '../../migrations/1660885016467-CreateTableBiddingModalities';
import { AlterTableContractAlterColumnBiddingModality1660885098408 } from '../../migrations/1660885098408-AlterTableContractAlterColumnBiddingModality';
import { Law } from '../modules/law/entities/law.entity';
import { LawArticle } from '../modules/law-article/entities/law-article.entity';
import { CreateLawsArticlesTable1660922054347 } from '../../migrations/1660922054347-CreateLawsArticlesTable';
import { CreateLawsTable1660921725321 } from '../../migrations/1660921725321-CreateLawsTable';

const config = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.envConfig.typeormHost,
  port: config.envConfig.typeormPort,
  database: config.envConfig.typeormDatabase,
  username: config.envConfig.typeormUsername,
  password: config.envConfig.typeormPassword,
  entities: [
    User,
    Role,
    Contract,
    Customer,
    System,
    City,
    CustomerType,
    File,
    SystemModule,
    ContractsSystemsModules,
    Admentment,
    AdmentmentType,
    AdmentmentsSystemsModules,
    PaymentMode,
    BiddingModality,
    Law,
    LawArticle,
  ],
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
    CreateFilesTable1657603283224,
    AlterTableCustomersAddCNPJ1657647940065,
    AlterTableFilesAddOriginalname1657764395639,
    AlterTableCustomersAddColumns1658195518592,
    CreateTableModules1658278152104,
    PopulateRolesTable1658979591363,
    CreateAmendmentTable1659043863056,
    CreateAdmentmentsSystemsTable1659046086941,
    CreateAdmentmentsTypeTable1659046234298,
    AddAdmentmentsTypeForeignKey1659046324211,
    AlterTableContractsAddColums1659539993636,
    AlterTableAdmentmentsAddDeleteColumn1659668656838,
    AlterTableFilesAddColumns1659672244685,
    CreatePaymentModesTable1660876780242,
    AlterTableContractAlterColumnPaymentMode1660876942428,
    AlterTableSystemModulesAlterRequiredColumns1660883251838,
    CreateTableBiddingModalities1660885016467,
    AlterTableContractAlterColumnBiddingModality1660885098408,
    CreateLawsArticlesTable1660922054347,
    CreateLawsTable1660921725321,
  ],
  logging: false,
});

export default AppDataSource;
