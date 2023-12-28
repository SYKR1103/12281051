import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { RequestWithUser } from '../common/interfaces/requestWithUser';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async createU(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  // @Post('/login')
  // async loginU(@Body() loginUserDto: LoginUserDto) {
  //   //return this.authService.loginUser(loginUserDto);
  //   const user = await this.authService.loginUser(loginUserDto);
  //   const token = await this.authService.generateJwtAccessToken(user.id);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginU(@Req() r: RequestWithUser) {
    //return this.authService.loginUser(loginUserDto);
    const { user } = r;
    const token = this.authService.generateJwtAccessToken(user.id);
    return { user, token };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Req() r: RequestWithUser) {
    return r.user;
  }
}
