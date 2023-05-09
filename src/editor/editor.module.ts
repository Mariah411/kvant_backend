import { AchievementModule } from './../achievement/achievement.module';
import { RolesModule } from './../roles/roles.module';
import { WorkersModule } from './../workers/workers.module';
import { GroupsModule } from './../groups/groups.module';
import { StudentsModule } from './../students/students.module';
import { Module } from '@nestjs/common';
import { EditorService } from './editor.service';
import { EditorController } from './editor.controller';

@Module({
  providers: [EditorService],
  controllers: [EditorController],
  imports: [
    StudentsModule,
    GroupsModule,
    WorkersModule,
    RolesModule,
    AchievementModule,
  ],
  exports: [EditorService],
})
export class EditorModule {}
