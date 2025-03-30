import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
/**
 * Defines what roles the token is required to have.
 * All roles must be present in the token to pass.
 *
 * Works together with AuthGuard
 */
export const Roles = (roles: string[]) => SetMetadata(ROLES_KEY, roles);
