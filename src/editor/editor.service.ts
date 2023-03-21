import { StudentsService } from './../students/students.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EditorService {
  constructor(private studentsService: StudentsService) {}

  async getStudentsInfo() {
    return await this.studentsService.getAllStudentsInfo();
  }
}
