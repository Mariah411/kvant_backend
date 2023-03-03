import { Achievement } from './achievement/achievement.model';
import { Rating } from './ratings/ratings.model';
import { Visit } from './visits/visits.model';
import { Student } from './students/students.model';
import { Kvantum } from './kvantums/kvantums.model';
import { WorkerRoles } from './roles/worker-roles.model';
import { Role } from './roles/roles.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkersService } from './workers/workers.service';
import { WorkersModule } from './workers/workers.module';
import { Workers } from './workers/workers.model';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { KvantumsModule } from './kvantums/kvantums.module';
import { GroupsService } from './groups/groups.service';
import { GroupsModule } from './groups/groups.module';
import { Groups } from './groups/gpoups.model';
import { StudentsModule } from './students/students.module';
import { VisitsModule } from './visits/visits.module';
import { AchievementModule } from './achievement/achievement.module';

import { RatingsService } from './ratings/ratings.service';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  controllers: [],
  providers: [WorkersService, GroupsService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Workers,
        Role,
        WorkerRoles,
        Kvantum,
        Groups,
        Student,
        Visit,
        Rating,
        Achievement,
      ],
      autoLoadModels: true,
      timezone: '+03:00',
    }),
    WorkersModule,
    RolesModule,
    AuthModule,
    KvantumsModule,
    GroupsModule,
    StudentsModule,
    VisitsModule,
    AchievementModule,
    RatingsModule,
  ],
})
export class AppModule {}
