import { Workers } from './../../workers/workers.model';
export class UpdateAchievementDto {
  readonly name: string;
  readonly place: number;
  readonly date: Date;
  readonly diplom: string;
  readonly id_rating: number;
  workers: number[];
  students: number[];
}
