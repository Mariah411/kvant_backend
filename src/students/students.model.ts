import { AchievementStudents } from './../achievement/achievement-students.model';
import { Achievement } from './../achievement/achievement.model';
import { Visit } from './../visits/visits.model';
import { Groups } from 'src/groups/gpoups.model';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface SdudentCreationAttrs {
  FIO: string;
  b_date: Date;
  year_study: number;
  num_doc: string;
  id_group?: number;
  note?: string;
}

@Table({ tableName: 'student', createdAt: false, updatedAt: false })
export class Student extends Model<Student, SdudentCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  FIO: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  num_doc: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  b_date: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  year_study: number;

  @Column({ type: DataType.STRING, allowNull: true })
  note: string;

  @ForeignKey(() => Groups)
  @Column({ type: DataType.INTEGER, allowNull: true })
  id_group: number;

  @BelongsTo(() => Groups, { onDelete: 'SET NULL' })
  group: Groups;

  @BelongsToMany(() => Achievement, () => AchievementStudents)
  achievements: Achievement[];

  @HasMany(() => Visit, { onDelete: 'CASCADE' })
  visits: Visit;
}
