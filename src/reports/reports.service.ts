import { Injectable } from '@nestjs/common';
import { GroupsService } from 'src/groups/groups.service';
import { GetIntervalVisitsDto } from 'src/visits/dto/get-interval-visits.dto';
import { VisitsService } from 'src/visits/visits.service';

@Injectable()
export class ReportsService {
  constructor(
    private groupsService: GroupsService,
    private visitsService: VisitsService,
  ) {}

  async groupsAttendance(dto: GetIntervalVisitsDto) {
    const groups = await this.groupsService.getAllGroups();
    const data = [];

    for (let group of groups) {
      let temp = {
        ...group.dataValues,
        attendance: await this.getGroupAttendance(group.id, dto),
      };
      data.push(temp);
    }

    return data;
  }

  async getGroupAttendance(id: number, dto: GetIntervalVisitsDto) {
    // N - уроков на одного ребенка
    // n - все пропуски
    // m - дети
    // (N*m - n) / N*m - процент посещаемости

    const group = await this.groupsService.getGroupStudents(id);
    console.log(group.students);

    const num_students = group.students.length;
    if (num_students === 0) return 0;

    const all_lessons = (
      await this.visitsService.getStudentVisitsInterval(
        group.students[0].dataValues.id,
        1,
        dto,
      )
    ).length;

    let unvisited_lessons = 0;
    for (let student of group.students) {
      unvisited_lessons += (
        await this.visitsService.getStudentUnVisitedLessons(
          student.dataValues.id,
          dto,
        )
      ).length;
    }

    const N = all_lessons,
      n = unvisited_lessons,
      m = num_students;

    if (N === 0 && m === 0) return 0;

    const attendance = Math.round(((N * m - n) / (N * m)) * 100 * 100) / 100;

    return attendance;
  }
}
