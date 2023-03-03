import { AddWorkerToAchDto } from './dto/add-worker.dto';
import { Student } from 'src/students/students.model';
import { StudentsService } from './../students/students.service';
import { AddStudentToAchDto } from './dto/add-student.dto';
import { Achievement } from './achievement.model';
import { InjectModel } from '@nestjs/sequelize';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { WorkersService } from 'src/workers/workers.service';

@Injectable()
export class AchievementService {
  constructor(
    @InjectModel(Achievement) private achievementRepository: typeof Achievement,
    private studentsService: StudentsService,
    private workersService: WorkersService,
  ) {}

  async createAchievement(dto: CreateAchievementDto) {
    return await this.achievementRepository.create(dto);
  }

  async getAllAchievements() {
    return await this.achievementRepository.findAll();
  }

  async getAchievementById(id: number) {
    return await this.achievementRepository.findByPk(id, {
      include: { all: true },
    });
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

  async addStudentToAchievement(dto: AddStudentToAchDto) {
    const achivement = await this.achievementRepository.findByPk(
      dto.id_achievement,
    );
    const student = await this.studentsService.getStudentById(dto.id_student);

    console.log(achivement);
    console.log(student);
    if (achivement && student) {
      console.log('добавление');
      await achivement.$add('student', student.id);
      return dto;
    }
    throw new HttpException(
      'Достижение или студент не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async addWorkerToAchievement(dto: AddWorkerToAchDto) {
    const achivement = await this.achievementRepository.findByPk(
      dto.id_achievement,
    );
    const worker = await this.workersService.gerWorkerbyId(dto.id_worker);

    if (achivement && worker) {
      console.log('добавление');
      await achivement.$add('worker', worker.id);
      return dto;
    }
    throw new HttpException(
      'Достижение или работник не найдены',
      HttpStatus.NOT_FOUND,
    );
  }
}
