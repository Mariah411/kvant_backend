import { Groups } from 'src/groups/gpoups.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Groups) private groupsRepository: typeof Groups) {}

  async createGroup(dto: CreateGroupDto) {
    const group = this.groupsRepository.create(dto);
    return group;
  }

  async getAllGroups() {
    const groups = this.groupsRepository.findAll({
      include: { all: true },
    });
    return groups;
  }
}
