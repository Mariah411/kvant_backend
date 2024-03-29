import { Groups } from 'src/groups/gpoups.model';
import { Kvantum } from './kvantums.model';
import { Module } from '@nestjs/common';
import { KvantumsController } from './kvantums.controller';
import { KvantumsService } from './kvantums.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [KvantumsController],
  providers: [KvantumsService],
  imports: [SequelizeModule.forFeature([Kvantum, Groups])],
  exports: [KvantumsService],
})
export class KvantumsModule {}
