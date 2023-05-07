import { Body, Controller, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { GetIntervalVisitsDto } from 'src/visits/dto/get-interval-visits.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post('/attendance/groups')
  getInterval(@Body() dto: GetIntervalVisitsDto) {
    return this.reportsService.groupsAttendance(dto);
  }
}
