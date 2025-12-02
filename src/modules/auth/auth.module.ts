import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthFactoryService } from './factory/index.js';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[],
  controllers: [AuthController],
  providers: [AuthService,AuthFactoryService,],
})
export class AuthModule {}
