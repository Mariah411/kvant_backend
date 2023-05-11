import { Body, Controller, Param, Post } from '@nestjs/common';
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

  @Post('/raiting/group/:id')
  groupRaiting(@Param('id') id: number, @Body() dto: GetIntervalVisitsDto) {
    return this.reportsService.groupRating(id, dto);
  }
}
