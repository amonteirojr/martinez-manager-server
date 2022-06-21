import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './modules/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './modules/config/config.service';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { CreatePermissionTable1652918119321 } from 'migrations/1652918119321-CreatePermissionTable';
import { CreateRoleTable1652918723159 } from 'migrations/1652918723159-CreateRoleTable';
import { CreateRolesPermissionsTable1652918998495 } from 'migrations/1652918998495-CreateRolesPermissionsTable';
import { AppController } from './app.controller';
import { ContractModule } from './modules/contract/contract.module';
import { CreateUsersTable1655696194528 } from 'migrations/1655696194528-CreateUsersTable';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.envConfig.typeormConnection,
        host: configService.envConfig.typeormHost,
        port: configService.envConfig.typeormPort,
        database: configService.envConfig.typeormDatabase,
        username: configService.envConfig.typeormUsername,
        password: configService.envConfig.typeormPassword,
        // ssl: { rejectUnauthorized: false },
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: false,
        migrationsRun: true,
        migrations: [
          CreatePermissionTable1652918119321,
          CreateRoleTable1652918723159,
          CreateRolesPermissionsTable1652918998495,
          CreateUsersTable1655696194528,
        ],
      }),
    }),
    RoleModule,
    PermissionModule,
    ContractModule,
  ],

  controllers: [AppController],
})
export class AppModule {}
