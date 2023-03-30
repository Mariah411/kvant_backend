import { EditorService } from './editor.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('editor')
export class EditorController {
  constructor(private editorService: EditorService) {}

  @Get('/students')
  getStudents() {
    return this.editorService.getStudentsInfo();
  }

  @Get('/groups')
  getGroups() {
    return this.editorService.getGroupsInfo();
  }

  @Get('/teachers')
  getTeachers() {
    return this.editorService.getTeachers();
  }

  @Get('/achievement/student/:id')
  getStudentAchievements(@Param('id') id: number) {
    return this.editorService.getAllStudentAchievements(id);
  }

  @Get('/achievements')
  getAllAchivements() {
    return this.editorService.getAllAchivementsInfo();
  }
}
