import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ForgetPasswordDTO } from './dto/forget-password.dto.js';
import { LoginDTO } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto';
import { AuthFactoryService } from './factory/index';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFactoryService: AuthFactoryService,
  ) {}

  @Post('/register')
  async create(@Body() registerDto: RegisterDto) {
    const user = await this.authFactoryService.create(registerDto);
    const createdUser = await this.authService.register(user);

    return {
      message: 'user created successfully',
      success: true,
      data: createdUser,
    };
  }

  @Post('/login')
  async login(@Body() loginDTO: LoginDTO) {
    const token = await this.authService.login(loginDTO);
    return {
      message: 'user login successfully',
      success: true,
      data: token,
    };
  }

  @Post('forget-password')
  async forgetPassword(@Body() forgetPasswordDTO: ForgetPasswordDTO) {
    const userUpdated =
      await this.authService.forgetPassword(forgetPasswordDTO);
    return {
      message: 'user updated successfully',
      success: true,
    };
  }

  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    await this.authService.sendOtp(email);
    return {
      message: 'send otp successfully',
      success: true,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
