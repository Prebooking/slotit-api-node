import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { SignInDto } from './dto/signIn.dto';
import { AuthTokenervice } from './services/auth-token.service';
import { ResponseService } from 'src/common/services/response.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private authTokenService: AuthTokenervice,
    private responseService: ResponseService,
  ) {}
  async signIn(signInDto: SignInDto, headers: any) {
    const user = await this.validateUser(signInDto, headers);
    const tokens = await this.authTokenService.generateTokens(
      user.id,
      user.email,
    );
    return this.responseService.successResponse('User logged successfully', {
      user,
      tokens,
    });
  }

  async validateUser(signInDto: SignInDto, headers: any): Promise<User> {
    const { email, password } = signInDto;
    const appType = headers['x_app_type'];

    const user = await this.usersService.findOneByParam({ email: email });
    if (!user || !user.password || !(await user.validatePassword(password))) {
      throw new UnauthorizedException({
        status: false,
        message: 'Invalid email or password',
      });
    }

    // app type validation need to implement in future
    // const userRoles = user.roles.map((role) => role.name);
    // if (appType && !userRoles.includes(appType)) {
    //   throw new UnauthorizedException({
    //     status: false,
    //     message: 'You do not have permission to access this resource',
    //   });
    // }

    return user;
  }

  async me(id: string) {
    const user = await this.usersService.findOneByParam({ id });
    return this.responseService.successResponse('Authenticated user', user);
  }
}
