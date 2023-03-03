import { AchievementWorkers } from './achievement-workers.model';
import { Rating } from './../ratings/ratings.model';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Workers } from 'src/workers/workers.model';
import { AchievementStudents } from './achievement-students.model';
import { Student } from 'src/students/students.model';

interface AchievementCreationAttrs {
  name: string;
  place: number;
  date: Date;
  diplom: string;
  id_rating: number;
}

@Table({ tableName: 'achievement', createdAt: false, updatedAt: false })
export class Achievement extends Model<Achievement, AchievementCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  date: Date;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  diplom: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  place: number;

  @ForeignKey(() => Rating)
  @Column({ type: DataType.INTEGER, allowNull: true })
  id_rating: number;

  @BelongsTo(() => Rating, { onDelete: 'SET NULL' })
  rating: Rating;

  @BelongsToMany(() => Workers, () => AchievementWorkers)
  workers: Workers[];

  @BelongsToMany(() => Student, () => AchievementStudents)
  students: Student[];
}
