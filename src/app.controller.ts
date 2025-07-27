import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  private readonly BASEURL: string;

  constructor(
    private readonly appService: AppService,
    private readonly redis: RedisService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) { 
    this.BASEURL = String(this.configService.get<string>('BASE_URL_CLIENT_SERVICE')); 
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('redis')
  getRedis(): any {
    return this.redis.get('teste')
  }

  @Get('/clients')
  async getClientService() {
    return await firstValueFrom(
      this.httpService.get(`${this.BASEURL}`)
    ).then((res) => {
      console.log("até aqui deu certo")
      return res.data
    })
  }

}
