import { Visit } from './../visits/visits.model';
import { TypeVisit } from './type_visits.model';
import { Module } from '@nestjs/common';
import { TypeVisitsService } from './type_visits.service';
import { TypeVisitsController } from './type_visits.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [TypeVisitsService],
  controllers: [TypeVisitsController],
  imports: [SequelizeModule.forFeature([TypeVisit, Visit])],
})
export class TypeVisitsModule {}
