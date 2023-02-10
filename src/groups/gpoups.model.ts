import { Student } from './../students/students.model';
import { Kvantum } from './../kvantums/kvantums.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Workers } from 'src/workers/workers.model';

interface GroupsCreationAttrs {
  name: string;
  shedule: string;
}

@Table({ tableName: 'gpoups', createdAt: false, updatedAt: false })
export class Groups extends Model<Groups, GroupsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  shedule: string;

  @ForeignKey(() => Workers)
  @Column({ type: DataType.INTEGER })
  id_teacher: number;

  @BelongsTo(() => Workers, { onDelete: 'SET NULL' })
  teacher: Workers;

  @ForeignKey(() => Kvantum)
  @Column({ type: DataType.INTEGER, allowNull: true })
  id_kvantum: number;

  @BelongsTo(() => Kvantum, { onDelete: 'SET NULL' })
  kvantum: Kvantum;

  @HasMany(() => Student, { onDelete: 'SET NULL' })
  students: Student[];
}
