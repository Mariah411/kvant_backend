import { Student } from './students.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
  ) {}

  async createStudent(dto: CreateStudentDto) {
    const student = this.studentRepository.create(dto);
    return student;
  }

  async findAllStudents() {
    const students = this.studentRepository.findAll();
    return students;
  }
}
