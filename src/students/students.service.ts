import { Visit } from 'src/visits/visits.model';
import { AchievementStudents } from './../achievement/achievement-students.model';
import { Achievement } from './../achievement/achievement.model';
import { Groups } from './../groups/gpoups.model';
import { Student } from './students.model';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStudentDto } from './dto/create-student.dto';
import { AchievementService } from 'src/achievement/achievement.service';

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

  async getAllStudentsInfo() {
    const students = await this.studentRepository.findAll({
      include: { model: Groups, as: 'group' },
    });
    return students;
  }

  async getStudentById(id: number) {
    const student = await this.studentRepository.findByPk(id, {
      include: { all: true },
    });
    return student;
  }

  asyc;
  async getStudentVisits(id: number) {
    const student = await this.studentRepository.findByPk(id, {
      include: { model: Visit },
    });
    return student;
  }

  async updateStudent(id: number, dto: CreateStudentDto) {
    const isUpdate = await this.studentRepository.update(
      {
        id_group: dto.id_group,
        FIO: dto.FIO,
        num_doc: dto.num_doc,
        b_date: dto.b_date,
        year_study: dto.year_study,
        note: dto.note,
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
