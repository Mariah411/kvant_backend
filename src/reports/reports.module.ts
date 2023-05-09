import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { GroupsModule } from 'src/groups/groups.module';
import { VisitsModule } from 'src/visits/visits.module';
import { WorkersModule } from 'src/workers/workers.module';
import { EditorModule } from 'src/editor/editor.module';
import { KvantumsModule } from 'src/kvantums/kvantums.module';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [
    GroupsModule,
    VisitsModule,
    WorkersModule,
    EditorModule,
    KvantumsModule,
  ],
})
export class ReportsModule {}
