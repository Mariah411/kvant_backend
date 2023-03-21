import { EditorService } from './editor.service';
import { Controller, Get } from '@nestjs/common';

@Controller('editor')
export class EditorController {
  constructor(private editorService: EditorService) {}

  @Get('/students')
  getStudents() {
    return this.editorService.getStudentsInfo();
  }
}
