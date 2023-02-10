import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

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

  @Put(':id')
  update(@Param('id') id: number, @Body() updateGroupDto: CreateGroupDto) {
    return this.groupsService.updateGroup(id, updateGroupDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.groupsService.deleteGroup(id);
  }
}
