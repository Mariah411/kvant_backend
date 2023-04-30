import { AchievementService } from 'src/achievement/achievement.service';
import { Role } from './../roles/roles.model';
import { RolesService } from './../roles/roles.service';
import { WorkersService } from './../workers/workers.service';
import { GroupsService } from './../groups/groups.service';
import { StudentsService } from './../students/students.service';
import { Injectable } from '@nestjs/common';
import { Workers } from 'src/workers/workers.model';

@Injectable()
export class EditorService {
  constructor(
    private studentsService: StudentsService,
    private groupsService: GroupsService,
    private workersService: WorkersService,
    private rolesService: RolesService,
    private achivementService: AchievementService,
  ) {}

  async getStudentsInfo() {
    return await this.studentsService.getAllStudentsInfo();
  }

  async getGroupsInfo() {
    return await this.groupsService.getGroupsWithKvantumsAndTeachers();
  }

  async getTeachers() {
    const workers = await this.workersService.getAllWorkersWithRoles();
    const role = await this.rolesService.getRoleByValue('TEACHER');

    const filterByRole = (item) => {
      if (item.roles.find((r) => r.id === role.id)) {
        return true;
      } else {
        return false;
      }
    };

    const teachers = workers
      .filter(filterByRole)
      .map((worker) => ({ id: worker.id, FIO: worker.FIO }));

    return teachers;
  }

  async getAllStudentAchievements(id: number) {
    const student = await this.studentsService.getStudentById(id);

    const achivementsArr = [];

    for (let el of student.achievements) {
      const ach = await this.achivementService.getAchievementById(
        el.dataValues.id,
      );
      achivementsArr.push(ach);
    }
    return achivementsArr;
  }

  async getAllAchivementsInfo() {
    return await this.achivementService.getAllAchievementsInfo();
  }

  async getAllWorkerAchievements(id: number) {
    const worker = await this.workersService.gerWorkerbyId(id);

    const achivementsArr = [];

    for (let el of worker.achievements) {
      const ach = await this.achivementService.getAchievementById(
        el.dataValues.id,
      );
      achivementsArr.push(ach);
    }
    return achivementsArr;
  }
}
