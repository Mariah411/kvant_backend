import { WorkerRoles } from './roles/worker-roles.model';
import { Role } from './roles/roles.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkersService } from './workers/workers.service';
import { WorkersModule } from './workers/workers.module';
import { Workers } from './workers/workers.model';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [WorkersService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Workers, Role, WorkerRoles],
      autoLoadModels: true,
    }),
    WorkersModule,
    RolesModule,
    AuthModule,
  ],
})
export class AppModule {}
