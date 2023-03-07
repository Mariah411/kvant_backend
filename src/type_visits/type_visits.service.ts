import { TypeVisit } from './type_visits.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTypeVisitDto } from './dto/create-type-visits.dto';

@Injectable()
export class TypeVisitsService {
  constructor(
    @InjectModel(TypeVisit) private typeVisitRepository: typeof TypeVisit,
  ) {}

  async createType(dto: CreateTypeVisitDto) {
    const type = await this.typeVisitRepository.create(dto);
    return type;
  }
}
