import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const request = context.switchToHttp().getRequest();

    if (request?.user) {
      const { sub } = request.user;
      const user = await this.userService.findOneByParam({ id: sub }, [
        'roles',
      ]);
      const userRoles = user.roles;
      for (const userRole of userRoles) {
        if (roles.includes(userRole.name)) {
          return true;
        }
      }
    }

    return false;
  }
}
