import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Groups } from 'src/groups/gpoups.model';
import { Role } from 'src/roles/roles.model';
import { WorkerRoles } from 'src/roles/worker-roles.model';
interface WorkersCreationAttrs {
  FIO: string;
  email: string;
  password: string;
}

@Table({ tableName: 'workers' })
export class Workers extends Model<Workers, WorkersCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  FIO: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BelongsToMany(() => Role, () => WorkerRoles)
  roles: Role[];

  @HasMany(() => Groups)
  groups: Groups[];
}
