import { AchievementWorkers } from './../achievement/achievement-workers.model';
import { Achievement } from './../achievement/achievement.model';
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

@Table({ tableName: 'workers', createdAt: false, updatedAt: false })
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

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BelongsToMany(() => Role, () => WorkerRoles)
  roles: Role[];

  @BelongsToMany(() => Achievement, () => AchievementWorkers)
  achievements: Achievement[];

  @HasMany(() => Groups, { onDelete: 'SET NULL' })
  groups: Groups[];
}
