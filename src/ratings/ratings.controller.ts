import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private ratingsService: RatingsService) {}

  @Post()
  create(@Body() dto: CreateRatingDto) {
    return this.ratingsService.createRating(dto);
  }

  @Get()
  getAll() {
    return this.ratingsService.getAllRatings();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: CreateRatingDto) {
    return this.ratingsService.updateRating(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.ratingsService.deleteRating(id);
  }
}
