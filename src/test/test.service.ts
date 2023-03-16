import { Rating } from './../ratings/ratings.model';
import { AchievementWorkers } from './../achievement/achievement-workers.model';
import { AchievementStudents } from './../achievement/achievement-students.model';
import { Achievement } from './../achievement/achievement.model';
import { CreateAchievementDto } from './../achievement/dto/create-achievement.dto';
import { TypeVisit } from './../type_visits/type_visits.model';
import { Student } from 'src/students/students.model';
import { Kvantum } from './../kvantums/kvantums.model';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/roles/roles.model';
import { Workers } from 'src/workers/workers.model';
import { QUERY } from './query';
import { Groups } from 'src/groups/gpoups.model';
import { Visit } from 'src/visits/visits.model';

@Injectable()
export class TestService {
  async create() {
    await this.clear();
    await this.createWorkers();
    await this.createKvantums();
    await this.createGroups();
    await this.createSudents();
    await this.createTypeVisits();
    await this.createVisits();
    await this.createRatings();
    await this.createAchievement();
  }

  async clear() {
    await Workers.sequelize.query(QUERY.deleteAll);
    await Workers.sequelize.sync();
  }

  async createWorkers() {
    const adminRole = await Role.create({
      value: 'ADMIN',
      description: 'Администратор',
    });

    const userRole = await Role.create({
      value: 'USER',
      description: 'Обычный пользователь',
    });

    const editorRole = await Role.create({
      value: 'EDITOR',
      description: 'Методист',
    });

    const admin = await Workers.create({
      email: 'admin@mail.ru',
      password: 'admin',
      FIO: 'Петренко Пётр Петрович',
    });
    admin.$set('roles', adminRole);
    admin.$set('roles', userRole);

    const user1 = await Workers.create({
      email: 'user1@mail.ru',
      password: 'user',
      FIO: 'Павленко Сергей Петрович',
    });
    user1.$set('roles', userRole);
    user1.$set('roles', editorRole);

    const user2 = await Workers.create({
      email: 'user2@mail.ru',
      password: 'user',
      FIO: 'Бромов Антон Павлович',
    });
    user2.$set('roles', userRole);

    const user3 = await Workers.create({
      email: 'user3@mail.ru',
      password: 'user',
      FIO: 'Борисова Мария Степановна',
    });
    user3.$set('roles', userRole);
  }

  async createKvantums() {
    [
      'IT-квантум',
      'РобоКвантум',
      'Биоквантум',
      'ГеоКвантум',
      'НаноКвантум',
      'Хайтек',
    ].forEach((el) => {
      Kvantum.create({ name: el });
    });
  }

  async createGroups() {
    [
      {
        id_kvantum: 1,
        id_teacher: 3,
        name: 'ИТ-1Б',
        age: '10-14 лет',
        shedule: 'Понедельник - пятница',
      },

      {
        id_kvantum: 1,
        id_teacher: 3,
        name: 'ИТ-2Б',
        age: '7-10 лет',
        shedule: 'Среда - суббота',
      },

      {
        id_kvantum: 3,
        id_teacher: 4,
        name: 'Био1',
        age: '10-14 лет',
        shedule: 'Понедельник - пятница',
      },
    ].forEach((el) => {
      Groups.create(el);
    });
  }

  async createSudents() {
    [
      {
        FIO: 'Иванова Олеся Васильевна',
        b_date: new Date('2015-03-04'),
        year_study: 1,
        num_doc: 'I-ЛЕ 040101',
        id_group: 3,
        note: 'био квантум',
      },
      {
        FIO: 'Петров Александр Дмитриевич',
        b_date: new Date('2010-10-25'),
        year_study: 2,
        num_doc: 'I-ЛЕ 193994',
        id_group: 1,
        note: 'переведен в it',
      },
      {
        FIO: 'Алексеева София Петровна',
        b_date: new Date('2010-09-01'),
        year_study: 2,
        num_doc: 'I-ЛЕ 398492',
        id_group: 1,
        note: 'it',
      },
    ].forEach((el) => {
      Student.create(el);
    });
  }

  async createTypeVisits() {
    await TypeVisit.create({ name: 'Занятие' });
    await TypeVisit.create({ name: 'Итоговая аттестация' });
  }

  async createVisits() {
    [
      {
        id_student: 1,
        id_type: 1,
        visit_date: new Date('2022-10-06'),
        is_visited: true,
      },
      {
        id_student: 3,
        id_type: 1,
        visit_date: new Date('2022-10-05'),
        is_visited: true,
      },
      {
        id_student: 3,
        id_type: 1,
        visit_date: new Date('2022-10-08'),
        is_visited: false,
      },

      {
        id_student: 2,
        id_type: 1,
        visit_date: new Date('2022-10-05'),
        is_visited: true,
      },
      {
        id_student: 2,
        id_type: 1,
        visit_date: new Date('2022-10-08'),
        is_visited: true,
      },

      {
        id_student: 2,
        id_type: 2,
        visit_date: new Date('2023-05-25'),
        is_visited: true,
        points: 55,
      },
      {
        id_student: 3,
        id_type: 2,
        visit_date: new Date('2023-05-25'),
        is_visited: true,
        points: 60,
      },
    ].forEach((el) => {
      Visit.create(el);
    });
  }

  async createRatings() {
    [
      { description: 'Победители и призеры внутренних конкурсов', points: 1 },
      { description: 'Участники конкурсов', points: 0.5 },
      { description: 'Победители и призеры областных конкурсов', points: 3 },
      {
        description: 'Победители и призеры всероссийских конкурсов',
        points: 5,
      },
      { description: 'Участие в защите проектов', points: 4 },
    ].forEach((el) => {
      Rating.create(el);
    });
  }

  async createAchievement() {
    // [
    //   {
    //     name: 'Технофест',
    //     place: 2,
    //     date: new Date('2022-12-18'),
    //     diplom: '1.jpg',
    //     id_rating: 3,
    //   },
    //   {
    //     name: 'Школа проектов',
    //     place: 1,
    //     date: new Date('2022-11-10'),
    //     diplom: '3.jpg',
    //     id_rating: 3,
    //   },
    // ].forEach((el) => {
    //   Achievement.create(el);
    // });

    const ach1 = await Achievement.create({
      name: 'Технофест',
      place: 2,
      date: new Date('2022-12-18'),
      diplom: '1.jpg',
      id_rating: 3,
    });

    const ach2 = await Achievement.create({
      name: 'Школа проектов',
      place: 1,
      date: new Date('2022-11-10'),
      diplom: '3.jpg',
      id_rating: 3,
    });

    const ach3 = await Achievement.create({
      name: 'Школа проектов',
      place: 2,
      date: new Date('2022-11-10'),
      diplom: '4.jpg',
      id_rating: 3,
    });

    ach1.$add('students', await Student.findByPk(2));
    ach1.$add('students', await Student.findByPk(3));
    ach1.$add('workers', await Workers.findByPk(1));

    ach3.$add('students', await Student.findByPk(2));
    ach3.$add('workers', await Workers.findByPk(1));

    ach2.$add('students', await Student.findByPk(1));
    ach2.$add('workers', await Workers.findByPk(2));

    // [
    //   { id_achievement: 1, id_student: 2 },
    //   { id_achievement: 1, id_student: 3 },
    //   { id_achievement: 2, id_student: 1 },
    // ].forEach((el) => {
    //   AchievementStudents.create(el);
    // });

    // [
    //   { id_achievement: 1, id_worker: 3 },
    //   { id_achievement: 2, id_worker: 2 },
    // ].forEach((el) => {
    //   AchievementWorkers.create(el);
    // });
  }
}
