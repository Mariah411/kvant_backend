import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Groups } from 'src/groups/gpoups.model';

interface KvantumCreationAttrs {
  name: string;
}

@Table({ tableName: 'kvantum' })
export class Kvantum extends Model<Kvantum, KvantumCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @HasMany(() => Groups)
  groups: Groups[];
}
