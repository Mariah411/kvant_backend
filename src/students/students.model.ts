import { Visit } from './../visits/visits.model';
import { Groups } from 'src/groups/gpoups.model';
import {
  BelongsTo,
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
  id_group?: number;
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

  @Column({ type: DataType.DATE, allowNull: false })
  b_date: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  year_study: number;

  @ForeignKey(() => Groups)
  @Column({ type: DataType.INTEGER, allowNull: true })
  id_group: number;

  @BelongsTo(() => Groups, { onDelete: 'SET NULL' })
  group: Groups;

  @HasMany(() => Visit, { onDelete: 'CASCADE' })
  visits: Visit;
}
