import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/modules/user/entities/user.entity';
import { Role } from 'src/types';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('public', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest();

    const requiredPermissionKeys: string[] =
      this.reflector.getAllAndOverride('required-permissions', [
        context.getHandler(),
        context.getClass(),
      ]) || [];

    if (!requiredPermissionKeys.length) {
      return true;
    }

    const data = req.user as User;

    if (data.role === Role.ADMIN) {
      return true;
    }

    throw new ForbiddenException('Not Admin');
  }
}
