import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { AddWorkerToAchDto } from './dto/add-worker.dto';
import { AddStudentToAchDto } from './dto/add-student.dto';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { AchievementService } from './achievement.service';
import { Achievement } from './achievement.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('achievement')
export class AchievementController {
  constructor(private achievementServise: AchievementService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() dto: CreateAchievementDto, @UploadedFile() image) {
    console.log(image);
    return this.achievementServise.createAchievement(dto, image);
  }

  @Get()
  getAll() {
    return this.achievementServise.getAllAchievements();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateAchievementDto) {
    return this.achievementServise.updateAchievement(id, dto);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.achievementServise.getAchievementById(id);
  }

  @Post('/students/')
  addStudent(@Body() dto: AddStudentToAchDto) {
    return this.achievementServise.addStudentToAchievement(dto);
  }

  @Post('/workers/')
  addWorker(@Body() dto: AddWorkerToAchDto) {
    return this.achievementServise.addWorkerToAchievement(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.achievementServise.deleteAchievement(id);
  }
}
