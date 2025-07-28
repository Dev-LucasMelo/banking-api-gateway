import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    RedisModule,
    HttpModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
