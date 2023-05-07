import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { GroupsModule } from 'src/groups/groups.module';
import { VisitsModule } from 'src/visits/visits.module';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [GroupsModule, VisitsModule],
})
export class ReportsModule {}
