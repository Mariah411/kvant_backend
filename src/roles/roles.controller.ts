import { CreateRoleDto } from './dto/create-role.dto';
import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesServise: RolesService) {}

  @Post()
  create(@Body() rolesDto: CreateRoleDto) {
    return this.rolesServise.createRole(rolesDto);
  }

  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.rolesServise.getRoleByValue(value);
  }
}
