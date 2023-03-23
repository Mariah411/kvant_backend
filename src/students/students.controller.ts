import { CreateStudentDto } from './dto/create-student.dto';
import { StudentsService } from './students.service';
import { Controller } from '@nestjs/common';
import {
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';

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

  @Get('/info')
  getAllInfo() {
    return this.studentsService.getAllStudentsInfo();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.studentsService.getStudentById(id);
  }

  // @Get(':id/achivements')
  // getAchivements(@Param('id') id: number) {
  //   return this.studentsService.getAllStudentAchievements(id);
  // }

  @Post(':id/visits')
  getVisits(@Param('id') id: number) {
    return this.studentsService.getStudentVisits(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() Dto: CreateStudentDto) {
    return this.studentsService.updateStudent(id, Dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.studentsService.deleteStudent(id);
  }
}
