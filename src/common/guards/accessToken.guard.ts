import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const token = this.extractToken(request);

    if (!token) {
      this.throwUnauthorized('No token provided');
    }

    try {
      const decodedToken = this.verifyToken(token);
      //@ts-ignore
      request.user = decodedToken;
      //@ts-ignore
      request.uid = decodedToken['sub'];
      return true;
    } catch (error) {
      this.throwUnauthorized('Invalid or expired token');
    }
  }

  private getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest();
  }

  private extractToken(request: Request): string | undefined {
    const authorization = request.headers.authorization;
    if (!authorization) return undefined;

    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : undefined;
  }

  private verifyToken(token: string): any {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  }

  private throwUnauthorized(message: string): never {
    throw new UnauthorizedException({
      status: false,
      message,
    });
  }
}
