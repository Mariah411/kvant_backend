import { Role } from './../roles/roles.model';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { RolesService } from './../roles/roles.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Workers } from './workers.model';
import { AchievementService } from 'src/achievement/achievement.service';

@Injectable()
export class WorkersService {
  constructor(
    @InjectModel(Workers) private workerRepository: typeof Workers,
    private roleService: RolesService,
    @Inject(forwardRef(() => AchievementService))
    private achivementService: AchievementService,
  ) {}

  async createWorker(dto: CreateWorkerDto) {
    const worker = await this.workerRepository.create(dto);
    // const role = await this.roleService.getRoleByValue('USER');
    // await worker.$set('roles', [role.id]);
    // worker.roles = [role];
    return worker;
  }

  async getAllWorkers() {
    const workers = await this.workerRepository.findAll({
      include: { all: true },
    });
    return workers;
  }

  async getAllWorkersWithRoles() {
    const workers = await this.workerRepository.findAll({
      include: { model: Role },
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

  async gerWorkerbyId(id: number) {
    const worker = await this.workerRepository.findByPk(id);
    return worker;
  }

  async getAllWorkerAchievements(id: number) {
    const worker = await this.workerRepository.findByPk(id, {
      include: { all: true },
    });

    const achivementsArr = [];

    for (let el of worker.achievements) {
      const ach = await this.achivementService.getAchievementById(
        el.dataValues.id,
      );
      achivementsArr.push(ach);
    }
    return achivementsArr;
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

  async updateWorker(id: number, dto: UpdateWorkerDto) {
    const isUpdated = await this.workerRepository.update(
      { email: dto.email, FIO: dto.FIO },
      { where: { id: id } },
    );
    const worker = await this.workerRepository.findByPk(id, {
      include: { model: Role },
    });

    if (worker) {
      worker.roles.forEach((r) => {
        worker.$remove('role', r.id);
      });
      for (let r of dto.roles) {
        const role = await this.roleService.getRoleByValue(r);
        if (role) await worker.$add('role', role.id);
      }

      return true;
    } else {
      return false;
    }
  }

  async deleteWorker(id: number) {
    const isDelete = await this.workerRepository.destroy({
      where: {
        id: id,
      },
    });

    return isDelete;
  }
}
