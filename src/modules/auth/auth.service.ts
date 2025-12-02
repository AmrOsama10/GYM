import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import {
  comparHashing,
  generateHashing,
  generateOtp,
  generateOtpExpiry,
  sendEmail,
} from '@common/index';
import { UserRepository } from '@models/index';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/auth.entity.js';
import { LoginDTO } from './dto/login.dto.js';
import { ForgetPasswordDTO } from './dto/forget-password.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async register(user: User) {
    const userExist = await this.userRepository.getOne({ email: user.email });

    if (userExist) {
      throw new ConflictException('user already exist');
    }

    const userCreated = await this.userRepository.create(user);

    const { password, ...userObj } = JSON.parse(JSON.stringify(userCreated));

    return userObj;
  }

  async login(loginDTO: LoginDTO) {
    const userExist = await this.userRepository.getOne({
      email: loginDTO.email,
    });

    const match = await comparHashing(
      loginDTO.password,
      userExist?.password || '',
    );

    if (!userExist || !match) {
      throw new UnauthorizedException('invalid credentials');
    }

    const token = this.jwtService.signAsync(
      { _id: userExist._id, email: userExist.email, role: 'User' },
      { expiresIn: '1h', secret: this.configService.get('jwt').secret },
    );
    return token;
  }

  async forgetPassword(forgetPasswordDTO: ForgetPasswordDTO) {
    await this.cheekOtp(forgetPasswordDTO.otp, forgetPasswordDTO.email);

    const userUpdated = await this.userRepository.update(
      { email: forgetPasswordDTO.email },
      {
        password: await generateHashing(forgetPasswordDTO.newPassword),
        otp: '',
        otpExpiry: '',
      },
    );

    return userUpdated;
  }

  async sendOtp(email: string) {
    const userExist = await this.userRepository.getOne({ email });
    if (!userExist) {
      throw new NotFoundException('user not found');
    }

    const otp = generateOtp();
    const otpExpiry = generateOtpExpiry();

    sendEmail({
      to: email,
      subject: 'confirm email',
      html: `<h1>your otp is ${otp}</h1>`,
    });

    userExist.otp = otp;
    userExist.otpExpiry = otpExpiry;
    userExist.save();
    return userExist;
  }

  async cheekOtp(otp: string, email: string) {
    const userExist = await this.userRepository.getOne({ email });
    if (!userExist) {
      throw new NotFoundException('user not found');
    }

    if (otp != userExist.otp) {
      throw new UnauthorizedException('invalid otp');
    }

    if (new Date(Date.now()) > userExist.otpExpiry) {
      throw new UnauthorizedException('otp expiry');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
