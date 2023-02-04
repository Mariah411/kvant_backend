import { CreateWorkerDto } from './dto/create-worker.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Workers } from './workers.model';

@Injectable()
export class WorkersService {
  constructor(@InjectModel(Workers) private workerRepository: typeof Workers) {}

  async createWorker(dto: CreateWorkerDto) {
    const worker = await this.workerRepository.create(dto);
    return worker;
  }

  async getAllWorkers() {
    const workers = await this.workerRepository.findAll();
    return workers;
  }
}
