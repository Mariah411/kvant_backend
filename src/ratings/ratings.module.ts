import { Achievement } from './../achievement/achievement.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RatingsController } from './ratings.controller';
import { Rating } from './ratings.model';
import { RatingsService } from './ratings.service';

@Module({
  controllers: [RatingsController],
  providers: [RatingsService],
  imports: [SequelizeModule.forFeature([Rating, Achievement])],
})
export class RatingsModule {}
