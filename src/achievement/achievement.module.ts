import { WorkersModule } from './../workers/workers.module';
import { StudentsModule } from './../students/students.module';
import { Workers } from 'src/workers/workers.model';
import { Student } from 'src/students/students.model';
import { AchievementStudents } from './achievement-students.model';
import { AchievementWorkers } from './achievement-workers.model';
import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rating } from 'src/ratings/ratings.model';
import { Achievement } from './achievement.model';

@Module({
  providers: [AchievementService],
  controllers: [AchievementController],
  imports: [
    SequelizeModule.forFeature([
      Rating,
      Achievement,
      AchievementWorkers,
      AchievementStudents,
      Workers,
      Student,
    ]),
    StudentsModule,
    WorkersModule,
  ],
})
export class AchievementModule {}
