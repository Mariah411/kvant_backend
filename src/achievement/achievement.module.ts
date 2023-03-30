import { FilesModule } from './../files/files.module';
import { WorkersModule } from './../workers/workers.module';
import { StudentsModule } from './../students/students.module';
import { Workers } from 'src/workers/workers.model';
import { Student } from 'src/students/students.model';
import { AchievementStudents } from './achievement-students.model';
import { AchievementWorkers } from './achievement-workers.model';
import { forwardRef, Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rating } from 'src/ratings/ratings.model';
import { Achievement } from './achievement.model';

@Module({
  providers: [AchievementService],
  controllers: [AchievementController],
  imports: [
    FilesModule,
    SequelizeModule.forFeature([
      Rating,
      Achievement,
      AchievementWorkers,
      AchievementStudents,
      Workers,
      Student,
    ]),
    forwardRef(() => StudentsModule),
    forwardRef(() => WorkersModule),
  ],
  exports: [SequelizeModule, AchievementService],
})
export class AchievementModule {}
