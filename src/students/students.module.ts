import { AchievementStudents } from './../achievement/achievement-students.model';
import { Achievement } from './../achievement/achievement.model';
import { Student } from './students.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { Groups } from 'src/groups/gpoups.model';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [
    SequelizeModule.forFeature([
      Groups,
      Student,
      Achievement,
      AchievementStudents,
    ]),
  ],
  exports: [SequelizeModule, StudentsService],
})
export class StudentsModule {}
