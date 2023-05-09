import { KvantumsService } from './../kvantums/kvantums.service';
import { Injectable } from '@nestjs/common';
import { EditorService } from 'src/editor/editor.service';
import { GroupsService } from 'src/groups/groups.service';
import { GetIntervalVisitsDto } from 'src/visits/dto/get-interval-visits.dto';
import { VisitsService } from 'src/visits/visits.service';
import { WorkersService } from 'src/workers/workers.service';

@Injectable()
export class ReportsService {
  constructor(
    private groupsService: GroupsService,
    private visitsService: VisitsService,
    private workersService: WorkersService,
    private editorService: EditorService,
    private kvantumsService: KvantumsService,
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

  async teachersAttendace(dto: GetIntervalVisitsDto) {
    const teachers = await this.editorService.getTeachers();

    const data = [];

    for (let teacher of teachers) {
      let temp = {
        ...teacher,
        attendance: await this.getTeacherAttendance(teacher.id, dto),
      };
      data.push(temp);
    }

    return data;
  }

  async kvantumsAttendance(dto: GetIntervalVisitsDto) {
    const kvantums = await this.kvantumsService.getAllKvantums();

    const data = [];

    for (let kvantum of kvantums) {
      let temp = {
        ...kvantum.dataValues,
        attendance: await this.getKvantumAttendance(kvantum.dataValues.id, dto),
      };
      data.push(temp);
    }

    return data;
  }

  async getTeacherAttendance(id: number, dto: GetIntervalVisitsDto) {
    const teacher = await this.workersService.gerWorkerbyId(id);

    if (teacher.groups.length === 0) return;
    const groupsAttendance = [];

    for (let group of teacher.groups) {
      const attendance = await this.getGroupAttendance(
        group.dataValues.id,
        dto,
      );
      if (attendance !== 0) groupsAttendance.push(attendance);
    }
    console.log('Посещаемость групп', groupsAttendance);

    let average =
      groupsAttendance.reduce((a, b) => a + b) / groupsAttendance.length;
    average = Math.round(average * 100) / 100;
    return average;
  }

  async getKvantumAttendance(id: number, dto: GetIntervalVisitsDto) {
    const kvantum = await this.kvantumsService.getKvantumByID(id);

    if (kvantum.groups.length === 0) return;
    const groupsAttendance = [];

    for (let group of kvantum.groups) {
      const attendance = await this.getGroupAttendance(
        group.dataValues.id,
        dto,
      );
      if (attendance !== 0) groupsAttendance.push(attendance);
    }
    //console.log('Посещаемость групп', groupsAttendance);

    let average =
      groupsAttendance.reduce((a, b) => a + b) / groupsAttendance.length;
    average = Math.round(average * 100) / 100;
    return average;
  }

  async getGroupAttendance(id: number, dto: GetIntervalVisitsDto) {
    // N - уроков на одного ребенка
    // n - все пропуски
    // m - дети
    // (N*m - n) / N*m - процент посещаемости

    try {
      const group = await this.groupsService.getGroupStudents(id);

      if (group.students.length === 0) return 0;

      const num_students = group.students.length;

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
    } catch {
      return 0;
    }
    // console.log(group.students);
  }
}
