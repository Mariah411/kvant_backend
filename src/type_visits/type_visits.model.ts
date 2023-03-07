import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Visit } from 'src/visits/visits.model';

interface TypeVisitsCreationAttrs {
  name: string;
}

@Table({ tableName: 'type_visit', createdAt: false, updatedAt: false })
export class TypeVisit extends Model<TypeVisit, TypeVisitsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @HasMany(() => Visit)
  visits: Visit[];
}
