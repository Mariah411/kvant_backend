import { GetIntervalVisitsDto } from './../visits/dto/get-interval-visits.dto';
import { VisitsService } from './../visits/visits.service';
import { Student } from 'src/students/students.model';
import { Kvantum } from 'src/kvantums/kvantums.model';
import { Groups } from 'src/groups/gpoups.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Groups) private groupsRepository: typeof Groups,
    private visitsService: VisitsService,
  ) {}

  async createGroup(dto: CreateGroupDto) {
    const group = await this.groupsRepository.create(dto);
    return group;
  }

  async getAllGroups() {
    const groups = await this.groupsRepository.findAll({
      include: { all: true },
    });
    return groups;
  }

  async getGroupById(id: number) {
    const group = await this.groupsRepository.findByPk(id, {
      include: { all: true },
    });
    return group;
  }

  async getGroupVisitsById(id: number, dto: GetIntervalVisitsDto) {
    const group = await this.groupsRepository.findByPk(id, {
      include: { model: Student },
    });

    let data = [];

    for (let student of group.students) {
      const visits = await this.visitsService.getIntervalVisits(
        student.dataValues.id,
        dto,
      );
      const temp = { ...student.dataValues, visits: visits };
      data.push(temp);
    }
    return data;
  }

  async getGroupsByWorkerId(id: number) {
    const groups = await this.groupsRepository.findAll({
      include: { all: true },
      where: { id_teacher: id },
    });
    return groups;
  }

  async updateGroup(id: number, dto: CreateGroupDto) {
    const isUpdate = await this.groupsRepository.update(
      {
        id_teacher: dto.id_teacher,
        id_kvantum: dto.id_kvantum,
        name: dto.name,
        age: dto.age,
        shedule: dto.shedule,
      },
      { where: { id: id } },
    );
    return isUpdate;
  }

  async deleteGroup(id: number) {
    const isDelete = await this.groupsRepository.destroy({
      where: {
        id: id,
      },
    });

    return isDelete;
  }
}
