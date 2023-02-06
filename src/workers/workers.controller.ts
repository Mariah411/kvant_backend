import { AddRoleDto } from './dto/add-role.dto';
import { RolesGuard } from './../auth/roles.guard';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';

@UseGuards(JwtAuthGuard)
@Controller('workers')
export class WorkersController {
  constructor(private workersService: WorkersService) {}

  @Post()
  create(@Body() workersDto: CreateWorkerDto) {
    return this.workersService.createWorker(workersDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.workersService.getAllWorkers();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/roles')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.workersService.addRoletoWorker(addRoleDto);
  }
}
