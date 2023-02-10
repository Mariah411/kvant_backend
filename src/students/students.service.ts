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
    const student = await this.studentRepository.create(dto);
    return student;
  }

  async findAllStudents() {
    const students = await this.studentRepository.findAll();
    return students;
  }

  async updateStudent(id: number, dto: CreateStudentDto) {
    const isUpdate = await this.studentRepository.update(
      {
        id_group: dto.id_group,
        FIO: dto.FIO,
        b_date: dto.b_date,
        year_study: dto.year_study,
      },
      { where: { id: id } },
    );
    return isUpdate;
  }

  async deleteStudent(id: number) {
    const isDelete = await this.studentRepository.destroy({
      where: {
        id: id,
      },
    });
    return isDelete;
  }
}
