import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/roles/roles.model';

export const ROLES_KEY = 'roles';

export function Roles(...roles: string[]) {
  return SetMetadata(ROLES_KEY, roles);
}
