import { CreateStudentDto } from './dto/create-student.dto';
import { StudentsService } from './students.service';
import { Controller } from '@nestjs/common';
import {
  Get,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post()
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.createStudent(dto);
  }

  @Get()
  getAll() {
    return this.studentsService.findAllStudents();
  }
}
