import { WorkersService } from './workers.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkersController } from './workers.controller';
import { Workers } from './workers.model';

@Module({
  controllers: [WorkersController],
  providers: [WorkersService],
  imports: [SequelizeModule.forFeature([Workers])],
  exports: [SequelizeModule],
})
export class WorkersModule {}
