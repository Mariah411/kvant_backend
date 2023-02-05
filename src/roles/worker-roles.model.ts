import { Role } from './roles.model';

import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Workers } from 'src/workers/workers.model';

@Table({ tableName: 'worker_roles', createdAt: false, updatedAt: false })
export class WorkerRoles extends Model<WorkerRoles> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @ForeignKey(() => Workers)
  @Column({ type: DataType.INTEGER })
  workerId: number;
}
