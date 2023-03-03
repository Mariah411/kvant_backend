import { Rating } from './../ratings/ratings.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

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
}
