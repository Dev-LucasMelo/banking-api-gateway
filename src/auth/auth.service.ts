import { BadRequestException, Injectable } from '@nestjs/common';
import { loginDto } from './validations/login.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service'; RedisService
@Injectable()
export class AuthService {
    private readonly BaseUrlClient: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly redis: RedisService
    ) {
        this.BaseUrlClient = String(this.configService.get<string>('BASE_URL_CLIENT_SERVICE'));
    }

    async login(dados: loginDto) {
        return await firstValueFrom(
            this.httpService.post(`${this.BaseUrlClient}auth/login`, dados)
        ).then((response) => {
            const { token } = response.data

            if (token) {
                let payload = this.jwtService.decode(token);

                this.redis.set(String(payload.id), JSON.stringify(payload))
            }

            return response.data;
        }).catch((err) => {
            const { response } = err
            const { data } = response

            throw new BadRequestException(data.message)
        })
    };

    async logout(payload: any) {
        this.redis.del(String(payload.id));
        return { message: "Sessão finalizada" };
    }
}
