import { GetIntervalVisitsDto } from './dto/get-interval-visits.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { CreateVisitDto } from './dto/create-visit.dto';
import { VisitsService } from './visits.service';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { DeleteVisitDto } from './dto/delete-visit.dto';

@Controller('visits')
export class VisitsController {
  studentsService: any;

  constructor(private visitsService: VisitsService) {}

  @Post()
  create(@Body() dto: CreateVisitDto) {
    return this.visitsService.createVisit(dto);
  }

  @Post(':id')
  getInterval(@Param('id') id: number, @Body() dto: GetIntervalVisitsDto) {
    return this.visitsService.getIntervalVisits(id, dto);
  }

  @Get()
  getAll() {
    return this.visitsService.getAllVisits();
  }

  @Put()
  update(@Body() Dto: UpdateVisitDto) {
    return this.visitsService.updateVisit(Dto);
  }

  @Delete('/:id_student/:visit_date')
  delete(
    @Param('id_student') id_student: number,
    @Param('visit_date') visit_date: string,
  ) {
    return this.visitsService.deleteVisit({ id_student, visit_date });
  }
}
