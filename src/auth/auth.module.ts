import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './local.strategy';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports:[
    HttpModule, 
    JwtModule.register({ secret: '244466666', signOptions: { expiresIn: '1h' } }),
    RedisModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
