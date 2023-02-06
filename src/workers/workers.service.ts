import { AddRoleDto } from './dto/add-role.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { RolesService } from './../roles/roles.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
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
    const role = await this.roleService.getRoleByValue('ADMIN');
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

  async addRoletoWorker(dto: AddRoleDto) {
    const worker = await this.workerRepository.findByPk(dto.id);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (worker && role) {
      await worker.$add('role', role.id);
      return dto;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }
}
