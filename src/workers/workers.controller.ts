import { AddRoleDto } from './dto/add-role.dto';
import { RolesGuard } from './../auth/roles.guard';
import { CreateWorkerDto } from './dto/create-worker.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { WorkersService } from './workers.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { UpdateWorkerDto } from './dto/update-worker.dto';

// @UseGuards(JwtAuthGuard)
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

  @Get(':id/achivements')
  getAchivements(@Param('id') id: number) {
    return this.workersService.getAllWorkerAchievements(id);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/roles')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.workersService.addRoletoWorker(addRoleDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workersService.updateWorker(id, updateWorkerDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.workersService.deleteWorker(id);
  }
}
