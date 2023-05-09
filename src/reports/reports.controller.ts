import { Body, Controller, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { GetIntervalVisitsDto } from 'src/visits/dto/get-interval-visits.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post('/attendance/groups')
  groupsAttendance(@Body() dto: GetIntervalVisitsDto) {
    return this.reportsService.groupsAttendance(dto);
  }

  @Post('/attendance/teachers')
  teahersAttendance(@Body() dto: GetIntervalVisitsDto) {
    return this.reportsService.teachersAttendace(dto);
  }

  @Post('/attendance/kvantums')
  kvantumsAttendance(@Body() dto: GetIntervalVisitsDto) {
    return this.reportsService.kvantumsAttendance(dto);
  }
}
