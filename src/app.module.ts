import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ConfigService } from './config/config.service';
import { CreateUserTable1652583952286 } from 'migrations/1652583952286-CreateUserTable';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { CreatePermissionTable1652918119321 } from 'migrations/1652918119321-CreatePermissionTable';
import { CreateRoleTable1652918723159 } from 'migrations/1652918723159-CreateRoleTable';
import { CreateRolesPermissionsTable1652918998495 } from 'migrations/1652918998495-CreateRolesPermissionsTable';
import { CreateUsersRolesTable1652918883842 } from 'migrations/1652918883842-CreateUsersRolesTable';
import { AppController } from './app.controller';
import { Permission } from './permission/entities/permission.entity';
import { Role } from './role/entities/role.entity';

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
        url: process.env.DATABASE_URL,
        // ssl: { rejectUnauthorized: false },
        entities: [User, Permission, Role],
        synchronize: false,
        migrationsRun: true,
        migrations: [
          CreateUserTable1652583952286,
          CreatePermissionTable1652918119321,
          CreateRoleTable1652918723159,
          CreateRolesPermissionsTable1652918998495,
          CreateUsersRolesTable1652918883842,
        ],
      }),
    }),
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
