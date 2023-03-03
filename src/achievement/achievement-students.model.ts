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
  tableName: 'achievement_students',
  createdAt: false,
  updatedAt: false,
})
export class AchievementStudents extends Model<AchievementStudents> {
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

  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER })
  studentId: number;
}
