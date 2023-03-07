export class CreateVisitDto {
  readonly id_student: number;
  readonly id_type: number;
  readonly visit_date: Date;
  readonly is_visited: boolean;
  readonly points?: number;
}
