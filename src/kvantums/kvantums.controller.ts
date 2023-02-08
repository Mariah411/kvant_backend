import { CreateKvantumDto } from './dto/create-kvantum.dto';
import { KvantumsService } from './kvantums.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('kvantums')
export class KvantumsController {
  constructor(private kvantumsServive: KvantumsService) {}

  @Post()
  create(@Body() dto: CreateKvantumDto) {
    return this.kvantumsServive.createKvantum(dto);
  }

  @Get()
  getAll() {
    return this.kvantumsServive.getAllKvantums();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateKvantumDto) {
    return this.kvantumsServive.updateKvantum(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.kvantumsServive.deleteKvantum(id);
  }
}
