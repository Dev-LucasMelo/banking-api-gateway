import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { RedisModule } from 'src/redis/redis.module';
import { ClientService } from './client.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [RedisModule, HttpModule],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule { }
