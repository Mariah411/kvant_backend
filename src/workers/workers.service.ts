import { RolesService } from './../roles/roles.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Workers } from './workers.model';

@Injectable()
export class WorkersService {
  constructor(
    @InjectModel(Workers) private workerRepository: typeof Workers,
    private roleService: RolesService,
  ) {}

  async createWorker(dto: CreateWorkerDto) {
    const worker = await this.workerRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await worker.$set('roles', [role.id]);
    worker.roles = [role];
    return worker;
  }

  async getAllWorkers() {
    const workers = await this.workerRepository.findAll({
      include: { all: true },
    });
    return workers;
  }

  async getWorkerByEmail(email: string) {
    const worker = await this.workerRepository.findOne({
      where: { email: email },
      include: { all: true },
    });
    return worker;
  }
}
