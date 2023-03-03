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
} from '@nestjs/common';

@Controller('achievement')
export class AchievementController {
  constructor(private achievementServise: AchievementService) {}

  @Post()
  create(@Body() dto: CreateAchievementDto) {
    return this.achievementServise.createAchievement(dto);
  }

  @Get()
  getAll() {
    return this.achievementServise.getAllAchievements();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateAchievementDto) {
    return this.achievementServise.updateAchievement(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.achievementServise.deleteAchievement(id);
  }
}
