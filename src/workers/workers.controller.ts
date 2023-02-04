import { CreateWorkerDto } from './dto/create-worker.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { WorkersService } from './workers.service';

@Controller('workers')
export class WorkersController {
  constructor(private workersService: WorkersService) {}

  @Post()
  create(@Body() workersDto: CreateWorkerDto) {
    return this.workersService.createWorker(workersDto);
  }

  @Get()
  getAll() {
    return this.workersService.getAllWorkers();
  }
}
