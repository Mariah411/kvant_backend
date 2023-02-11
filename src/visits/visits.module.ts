import { Visit } from './visits.model';
import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { Student } from 'src/students/students.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [VisitsService],
  controllers: [VisitsController],
  imports: [SequelizeModule.forFeature([Visit, Student])],
})
export class VisitsModule {}
