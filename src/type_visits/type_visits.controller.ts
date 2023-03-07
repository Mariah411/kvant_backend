import { CreateTypeVisitDto } from './dto/create-type-visits.dto';
import { TypeVisitsService } from './type_visits.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('type-visits')
export class TypeVisitsController {
  constructor(private typeVisitsService: TypeVisitsService) {}

  @Post()
  create(@Body() dto: CreateTypeVisitDto) {
    return this.typeVisitsService.createType(dto);
  }
}
