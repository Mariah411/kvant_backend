import { Kvantum } from './../kvantums/kvantums.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Workers } from 'src/workers/workers.model';

interface GroupsCreationAttrs {
  name: string;
  shedule: string;
}

@Table({ tableName: 'gpoups' })
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
  @Column({ type: DataType.INTEGER, allowNull: true })
  id_teacher: number;

  @BelongsTo(() => Workers)
  teacher: Workers;

  @ForeignKey(() => Kvantum)
  @Column({ type: DataType.INTEGER, allowNull: true })
  id_kvantum: number;

  @BelongsTo(() => Kvantum)
  kvantum: Kvantum;
}
