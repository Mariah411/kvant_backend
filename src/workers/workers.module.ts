import { AuthModule } from './../auth/auth.module';
import { RolesModule } from './../roles/roles.module';
import { WorkerRoles } from './../roles/worker-roles.model';
import { Role } from './../roles/roles.model';
import { WorkersService } from './workers.service';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkersController } from './workers.controller';
import { Workers } from './workers.model';

@Module({
  controllers: [WorkersController],
  providers: [WorkersService],
  imports: [
    SequelizeModule.forFeature([Workers, Role, WorkerRoles]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [SequelizeModule, WorkersService],
})
export class WorkersModule {}
