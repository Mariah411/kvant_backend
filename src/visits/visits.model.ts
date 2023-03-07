import { TypeVisit } from './../type_visits/type_visits.model';
import { Student } from './../students/students.model';

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface VisitCreationAttrs {
  id_student: number;
  id_type: number;
  visit_date: Date;
  is_visited: boolean;
  points?: number;
}

@Table({ tableName: 'visit', createdAt: false, updatedAt: false })
export class Visit extends Model<Visit, VisitCreationAttrs> {
  @ForeignKey(() => Student)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
  })
  id_student: number;

  @BelongsTo(() => Student, { onDelete: 'CASCADE' })
  student: Student;

  @ForeignKey(() => TypeVisit)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_type: number;

  @BelongsTo(() => TypeVisit, { onDelete: 'CASCADE' })
  type: TypeVisit;

  @Column({ type: DataType.DATEONLY, allowNull: false, primaryKey: true })
  visit_date: Date;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  is_visited: boolean;

  @Column({ type: DataType.INTEGER, allowNull: true })
  points: number;
}
