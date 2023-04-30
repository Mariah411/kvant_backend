import { FilesService } from './../files/files.service';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Student } from './../students/students.model';
import { Workers } from './../workers/workers.model';
import { AddWorkerToAchDto } from './dto/add-worker.dto';
import { StudentsService } from './../students/students.service';
import { AddStudentToAchDto } from './dto/add-student.dto';
import { Achievement } from './achievement.model';
import { InjectModel } from '@nestjs/sequelize';
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { WorkersService } from 'src/workers/workers.service';

@Injectable()
export class AchievementService {
  constructor(
    @InjectModel(Achievement) private achievementRepository: typeof Achievement,
    @Inject(forwardRef(() => StudentsService))
    private studentsService: StudentsService,
    @Inject(forwardRef(() => WorkersService))
    private workersService: WorkersService,
    private fileService: FilesService,
  ) {}

  async createAchievement(dto: CreateAchievementDto, image: any) {
    //console.log(image);
    const fileName = await this.fileService.createFile(image);
    return await this.achievementRepository.create({
      ...dto,
      diplom: fileName,
    });
  }

  async getAllAchievements() {
    return await this.achievementRepository.findAll();
  }

  async getAllAchievementsInfo() {
    return await this.achievementRepository.findAll({ include: { all: true } });
  }

  async getAchievementById(id: number) {
    return await this.achievementRepository.findByPk(id, {
      include: { all: true },
    });
  }

  async updateAchievement(id: number, dto: UpdateAchievementDto) {
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

    if (isUpdate) {
      const ach = await this.achievementRepository.findByPk(id, {
        include: [{ model: Student }, { model: Workers }],
      });

      if (ach) {
        ach.workers.forEach((w) => ach.$remove('worker', w.id));
        ach.students.forEach((s) => ach.$remove('student', s.id));

        for (let s of dto.students) {
          const student = await this.studentsService.getStudentById(s);
          if (student) await ach.$add('student', student.id);
        }

        for (let w of dto.workers) {
          const worker = await this.workersService.gerWorkerbyId(w);
          if (worker) await ach.$add('worker', worker.id);
        }
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  async deleteAchievement(id: number) {
    const diplom = (await this.achievementRepository.findByPk(id)).diplom;
    const isDelete = await this.achievementRepository.destroy({
      where: {
        id: id,
      },
    });

    this.fileService.deleteFile(diplom);

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
