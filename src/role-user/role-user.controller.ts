import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleUserService } from './role-user.service';
import { CreateRoleUserDto } from './dto/create-role-user.dto';
import { UpdateRoleUserDto } from './dto/update-role-user.dto';

@Controller('role-user')
export class RoleUserController {
  constructor(private readonly roleUserService: RoleUserService) {}
}
