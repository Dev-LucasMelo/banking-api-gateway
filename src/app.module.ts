import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { KafkaModule } from './kafka/kafka.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    RedisModule,
    HttpModule,
    AuthModule,
    ClientModule,
    KafkaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
