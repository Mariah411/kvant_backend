import { Achievement } from './../achievement/achievement.model';
import { Groups } from './../groups/gpoups.model';
import { AuthModule } from './../auth/auth.module';
import { RolesModule } from './../roles/roles.module';
import { WorkerRoles } from './../roles/worker-roles.model';
import { Role } from './../roles/roles.model';
import { WorkersService } from './workers.service';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkersController } from './workers.controller';
import { Workers } from './workers.model';
import { AchievementWorkers } from 'src/achievement/achievement-workers.model';

@Module({
  controllers: [WorkersController],
  providers: [WorkersService],
  imports: [
    SequelizeModule.forFeature([
      Workers,
      Role,
      WorkerRoles,
      Groups,
      Achievement,
      AchievementWorkers,
    ]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [SequelizeModule, WorkersService],
})
export class WorkersModule {}
