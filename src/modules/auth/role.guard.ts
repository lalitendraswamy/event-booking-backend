import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
 
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
 
  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>(ROLES_KEY, context.getHandler());
    if (!requiredRole) {
      return true; 
    }
 
    const request = context.switchToHttp().getRequest();
    const user = request.user;
 
    if (!user || !user.role) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }
 
    if (user.role !== requiredRole) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }
 
    return true; 
  }
}
 
 
// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class RoleGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {

    
//     return true;
//   }
// }