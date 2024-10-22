import { Injectable, CanActivate, ExecutionContext, ForbiddenException, HttpStatus, HttpException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
 
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
 
  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>(ROLES_KEY, context.getHandler());
    if (!requiredRole || requiredRole.length===0 ) {
      return true; 
    }
 
    const request = context.switchToHttp().getRequest();
    const user = request.user;
 
    if (!user || !user.role) {
      // return {code:HttpStatus.UNAUTHORIZED,message:"You are Not Authorized to access this Resource"}
      throw new HttpException("You are Not Authorized to access this Resource",HttpStatus.UNAUTHORIZED)
    }
    
    const hasAccess = requiredRole.includes(user.role);
    if (!hasAccess) {
      
      // return {code:HttpStatus.FORBIDDEN,message:"Only Admin can Access this Resource"}
      throw new HttpException("Only Admin can Access this Resource",HttpStatus.FORBIDDEN)
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