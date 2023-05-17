import { KvantumsService } from './../kvantums/kvantums.service';
import { Injectable } from '@nestjs/common';
import { EditorService } from 'src/editor/editor.service';
import { GroupsService } from 'src/groups/groups.service';
import { StudentsService } from 'src/students/students.service';
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

  // Посещаемость
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

  // посещаемость (преподаватель)
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

  // посещаемость квантум
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

  // посещаемость ученика
  async getStudentAttendance(id: number, dto: GetIntervalVisitsDto) {
    const all_lessons = (
      await this.visitsService.getStudentVisitsInterval(id, 1, dto)
    ).length;

    const unvisited_lessons = (
      await this.visitsService.getStudentUnVisitedLessons(id, dto)
    ).length;

    if (all_lessons === 0) return 0;

    let attendance = (all_lessons - unvisited_lessons) / all_lessons;
    attendance = Math.round(attendance * 100 * 100) / 100;

    return attendance;
  }

  // подсчет достижений ученика
  async countStudentAchivements(id: number, dto: GetIntervalVisitsDto) {
    let achivements = await this.editorService.getAllStudentAchievements(id);

    achivements = achivements.filter(
      (ach) =>
        ach.dataValues.date >= dto.start_date &&
        ach.dataValues.date <= dto.end_date,
    );

    const points = achivements.reduce(
      (sum, ach) => sum + ach.dataValues.rating.points,
      0,
    );
    return points;
  }

  // подсчет достижений учителя
  async countTeacherAchivements(id: number, dto: GetIntervalVisitsDto) {
    let achivements = await this.editorService.getAllWorkerAchievements(id);

    achivements = achivements.filter(
      (ach) =>
        ach.dataValues.date >= dto.start_date &&
        ach.dataValues.date <= dto.end_date,
    );

    const points = achivements.reduce(
      (sum, ach) => sum + ach.dataValues.rating.points,
      0,
    );
    return points;
  }

  // подсчет достижений квантума
  async countKvantumAchievements(id: number, dto: GetIntervalVisitsDto) {
    const kvantum = await this.kvantumsService.getKvantumByID(id);

    if (kvantum.groups.length === 0) return;
    let data = 0;

    for (let group of kvantum.groups) {
      const temp = await this.countGroupAchivements(group.dataValues.id, dto);

      data += temp;
    }

    return data;
  }

  // подсчет достижений группы
  async countGroupAchivements(group_id: number, dto: GetIntervalVisitsDto) {
    console.log(group_id);
    const group = await this.groupsService.getGroupStudents(group_id);
    let data = 0;

    for (let student of group.students) {
      const temp = await this.countStudentAchivements(
        student.dataValues.id,
        dto,
      );
      data += temp;
    }

    return data;
  }

  // достижения педагогов
  async teachersAchievements(dto: GetIntervalVisitsDto) {
    const teachers = await this.editorService.getTeachers();

    const data = [];

    for (let teacher of teachers) {
      let temp = {
        ...teacher,
        achievements: await this.countTeacherAchivements(teacher.id, dto),
      };
      data.push(temp);
    }

    return data;
  }

  // достижения групп
  async groupsAchievements(dto: GetIntervalVisitsDto) {
    const groups = await this.groupsService.getAllGroups();
    const data = [];

    for (let group of groups) {
      let temp = {
        ...group.dataValues,
        achievements: await this.countGroupAchivements(group.id, dto),
      };
      data.push(temp);
    }

    return data;
  }

  async kvantumsAchievements(dto: GetIntervalVisitsDto) {
    const kvantums = await this.kvantumsService.getAllKvantums();

    const data = [];

    for (let kvantum of kvantums) {
      let temp = {
        ...kvantum.dataValues,
        achievements: await this.countKvantumAchievements(
          kvantum.dataValues.id,
          dto,
        ),
      };
      data.push(temp);
    }

    return data;
  }

  async groupRating(group_id: number, dto: GetIntervalVisitsDto) {
    console.log(group_id);
    const group = await this.groupsService.getGroupStudents(group_id);
    let data = [];

    for (let student of group.students) {
      const temp = {
        ...student.dataValues,
        ...(await this.getStudentRaiting(student.dataValues.id, dto)),
      };
      data.push(temp);
    }

    data.sort((a, b) => (a.total_points < b.total_points ? 1 : -1));
    return data;
  }

  async getStudentRaiting(id: number, dto: GetIntervalVisitsDto) {
    const attendance = await this.getStudentAttendance(id, dto);
    const points = await this.countStudentAchivements(id, dto);
    const attestations = await this.visitsService.getIntervalAttestation(
      id,
      dto,
    );

    let attestations_points = 0;

    if (attestations.length !== 0)
      attestations_points =
        attestations[attestations.length - 1].dataValues.points;

    let total_points = attendance + points + attestations_points;
    total_points = Math.round(total_points * 100) / 100;
    return {
      attendance: attendance,
      achievements: points,
      attestation: attestations_points,
      total_points: total_points,
    };
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
