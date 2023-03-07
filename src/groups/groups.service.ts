import { Groups } from 'src/groups/gpoups.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Groups) private groupsRepository: typeof Groups) {}

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
