import { VisitsModule } from './../visits/visits.module';
import { Student } from './../students/students.model';
import { Groups } from './gpoups.model';
import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Workers } from 'src/workers/workers.model';
import { Kvantum } from 'src/kvantums/kvantums.model';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [
    SequelizeModule.forFeature([Groups, Workers, Kvantum, Student]),
    VisitsModule,
  ],
  exports: [GroupsService],
})
export class GroupsModule {}
