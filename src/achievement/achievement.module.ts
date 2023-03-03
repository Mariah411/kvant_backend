import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rating } from 'src/ratings/ratings.model';
import { Achievement } from './achievement.model';

@Module({
  providers: [AchievementService],
  controllers: [AchievementController],
  imports: [SequelizeModule.forFeature([Rating, Achievement])],
})
export class AchievementModule {}
