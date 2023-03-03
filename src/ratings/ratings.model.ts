import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface RatingCreationAttrs {
  description: string;
  points: number;
}

@Table({ tableName: 'rating', createdAt: false, updatedAt: false })
export class Rating extends Model<Rating, RatingCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  description: string;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  points: number;

  //   @HasMany(() => Groups)
  //   groups: Groups[];
}
