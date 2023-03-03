import { Achievement } from './achievement.model';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { Workers } from 'src/workers/workers.model';
import { Student } from 'src/students/students.model';

@Table({
  tableName: 'achievement_workers',
  createdAt: false,
  updatedAt: false,
})
export class AchievementWorkers extends Model<AchievementWorkers> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Achievement)
  @Column({ type: DataType.INTEGER })
  achievementId: number;

  @ForeignKey(() => Workers)
  @Column({ type: DataType.INTEGER })
  workerId: number;
}
