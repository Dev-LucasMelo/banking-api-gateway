import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { updateClientDto } from './validation/updateClientDto';

@Injectable()
export class ClientService {
    private readonly BaseUrlClient: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.BaseUrlClient = String(this.configService.get<string>('BASE_URL_CLIENT_SERVICE'));
    }

    async findById(id: string) {
        return await firstValueFrom(
            this.httpService.get(`${this.BaseUrlClient}client/${id}`)
        ).then((response) => {
            return response.data;
        }).catch((err) => {
            throw new BadRequestException('Erro ao buscar cliente');
        });
    }

    async update(id: string, data: updateClientDto) {
        return await firstValueFrom(
            this.httpService.patch(`${this.BaseUrlClient}client/${id}`, data)
        ).then((response) => {
            return response.data;
        }).catch((err) => {
            const { response } = err
            const { data } = response

            throw new BadRequestException(data);
        });
    }

    async uploadS3(file: Express.Multer.File, clientId: string): Promise<string> {
        const { originalname } = file
        return `uploads/${clientId}/${originalname.replace(/[. ]/g, '_')}`
    }

    async updateProfilePicture(file: Express.Multer.File, id: string) {
        let urlS3 = await this.uploadS3(file, id)

        const data = {
            urlS3
        }

        return await firstValueFrom(
            this.httpService.patch(`${this.BaseUrlClient}client/${id}/profile-picture`, data)
        ).then((response) => {
            return response.data;
        }).catch((err) => {
            const { response } = err
            const { data } = response

            throw new BadRequestException(data);
        });
    }

}
