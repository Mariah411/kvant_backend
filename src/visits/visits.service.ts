import { DeleteVisitDto } from './dto/delete-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { CreateVisitDto } from './dto/create-visit.dto';
import { Visit } from './visits.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GetIntervalVisitsDto } from './dto/get-interval-visits.dto';

const { Op, fn } = require('sequelize');
const moment = require('moment');

@Injectable()
export class VisitsService {
  constructor(@InjectModel(Visit) private visitRepository: typeof Visit) {}

  async createVisit(dto: CreateVisitDto) {
    const visit = await this.visitRepository.create(dto);
    return visit;
  }

  async createVisits(dtos: CreateVisitDto[]) {
    for (let dto of dtos) {
      const visit = await this.visitRepository.create(dto);
    }
  }

  async getAllVisits() {
    const visits = await this.visitRepository.findAll({
      include: { all: true },
    });
    return visits;
  }

  async updateVisit(dto: UpdateVisitDto) {
    const new_date = moment(new Date(dto.visit_date)).format('YYYY-MM-DD');
    console.log(new_date);
    //const new_date = new Date(dto.visit_date).toDateString();

    const isUpdate = await this.visitRepository.update(
      {
        is_visited: dto.is_visited,
        points: dto.points,
        id_type: dto.id_type,
      },
      {
        where: {
          [Op.and]: [
            { id_student: { [Op.eq]: dto.id_student } },
            { visit_date: { [Op.eq]: new_date } },
          ],
        },
      },
    );
    return isUpdate;
  }

  async deleteVisit(dto: DeleteVisitDto) {
    console.log('Данные:', dto);
    const new_date = moment(new Date(dto.visit_date)).format('YYYY-MM-DD');
    console.log(new_date);

    const isDelete = await this.visitRepository.destroy({
      where: {
        [Op.and]: [
          { id_student: { [Op.eq]: dto.id_student } },
          { visit_date: { [Op.eq]: new_date } },
        ],
      },
    });
    return isDelete;
  }

  async getStudentVisitsInterval(
    id_student: number,
    id_type: number,
    dto: GetIntervalVisitsDto,
    options: any[] = [],
  ) {
    //console.log(options);
    const start_date = moment(new Date(dto.start_date)).format('YYYY-MM-DD');
    const end_date = moment(new Date(dto.end_date)).format('YYYY-MM-DD');

    const visits = await this.visitRepository.findAll({
      where: {
        [Op.and]: [
          { id_type: { [Op.eq]: id_type } },
          { id_student: { [Op.eq]: id_student } },
          {
            visit_date: { [Op.between]: [start_date, end_date] },
          },
          ...options,
        ],
      },
      order: [['visit_date', 'ASC']],
    });
    return visits;
  }

  async getIntervalVisits(id: number, dto: GetIntervalVisitsDto) {
    const visits = await this.getStudentVisitsInterval(id, 1, dto);

    return visits;
  }

  async getIntervalAttestation(id: number, dto: GetIntervalVisitsDto) {
    const visits = await this.getStudentVisitsInterval(id, 2, dto);
    return visits;
  }

  async getStudentUnVisitedLessons(id: number, dto: GetIntervalVisitsDto) {
    const options = [{ is_visited: { [Op.eq]: false } }];
    const visits = await this.getStudentVisitsInterval(id, 1, dto, options);
    return visits;
  }

  async getStudentAttendance(id: number, dto: GetIntervalVisitsDto) {
    const all_lessons = await this.getStudentVisitsInterval(id, 1, dto);
    const unvisited_lessons = await this.getStudentUnVisitedLessons(id, dto);

    // console.log('id_student: ', id);
    // console.log('всего занятий: ', all_lessons.length);
    // console.log('посещено: ', visited_lessons.length);
    if (all_lessons.length === 0) return;
    const attendance =
      Math.round(
        ((all_lessons.length - unvisited_lessons.length) / all_lessons.length) *
          100 *
          100,
      ) / 100;

    return attendance;
  }
}
