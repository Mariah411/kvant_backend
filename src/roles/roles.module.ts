import { WorkerRoles } from './worker-roles.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { RolesService } from './roles.service';
import { Workers } from 'src/workers/workers.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, Workers, WorkerRoles])],
  exports: [SequelizeModule, RolesService],
})
export class RolesModule {}
