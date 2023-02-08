import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
