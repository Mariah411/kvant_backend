import { Achievement } from './achievement.model';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';

@Injectable()
export class AchievementService {
  constructor(
    @InjectModel(Achievement) private achievementRepository: typeof Achievement,
  ) {}

  async createAchievement(dto: CreateAchievementDto) {
    return await this.achievementRepository.create(dto);
  }

  async getAllAchievements() {
    return await this.achievementRepository.findAll();
  }

  async getAchievementById(id: number) {
    return await this.achievementRepository.findByPk(id);
  }

  async updateAchievement(id: number, dto: CreateAchievementDto) {
    const isUpdate = await this.achievementRepository.update(
      {
        name: dto.name,
        place: dto.place,
        date: dto.date,
        diplom: dto.diplom,
        id_rating: dto.id_rating,
      },
      { where: { id: id } },
    );
    return isUpdate;
  }

  async deleteAchievement(id: number) {
    const isDelete = await this.achievementRepository.destroy({
      where: {
        id: id,
      },
    });

    return isDelete;
  }
}
