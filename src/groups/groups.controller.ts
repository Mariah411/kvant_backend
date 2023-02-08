import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post()
  create(@Body() dto: CreateGroupDto) {
    return this.groupsService.createGroup(dto);
  }

  @Get()
  getAll() {
    return this.groupsService.getAllGroups();
  }
}
