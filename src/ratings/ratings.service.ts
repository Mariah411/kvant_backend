import { Rating } from './ratings.model';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingsService {
  constructor(@InjectModel(Rating) private ratingRepository: typeof Rating) {}

  async createRating(dto: CreateRatingDto) {
    return await this.ratingRepository.create(dto);
  }

  async getAllRatings() {
    return await this.ratingRepository.findAll();
  }

  async getRatingById(id: number) {
    return await this.ratingRepository.findByPk(id);
  }

  async updateRating(id: number, dto: CreateRatingDto) {
    const isUpdate = await this.ratingRepository.update(
      { description: dto.description, points: dto.points },
      { where: { id: id } },
    );
    return isUpdate;
  }

  async deleteRating(id: number) {
    const isDelete = await this.ratingRepository.destroy({
      where: {
        id: id,
      },
    });

    return isDelete;
  }
}
