import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private redisClient: Redis;

  onModuleInit() {
    const redisHost = process.env.REDIS_HOST || 'redis'; 
    const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10); 

    this.redisClient = new Redis({
      host: redisHost,
      port: redisPort,
    });

    this.redisClient.on('connect', () => {
      console.log('Conectado ao Redis');
    });

    this.redisClient.on('error', (err) => {
      console.error('Erro ao conectar ao Redis:', err);
    });
  }

  async set(key: string, value: string) {
    await this.redisClient.set(key, value);
  }

  async get(key: string) {
    return await this.redisClient.get(key);
  }

  async del(key: string) {
    await this.redisClient.del(key);
  }

  getClient() {
    return this.redisClient;
  }
}