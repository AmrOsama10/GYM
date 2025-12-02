import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import devConfig from './config/env/dev.config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import {  CommonModule, UserModule } from '@shared/index';

@Module({
  imports: [
  ConfigModule.forRoot({
      load: [devConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
        uri:configService.get('db').url
      })
    }),
    AuthModule,
    UserModule,
    CommonModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
