import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { clientLoggedIn } from 'src/auth/decorators/clientLoggedIn.decorator';
import { JWTguard } from 'src/auth/jwt.guard';
import { RedisService } from 'src/redis/redis.service';
import { ClientService } from './client.service';
import { updateClientDto } from './validation/updateClientDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'

@UseGuards(JWTguard)
@Controller('client')
export class ClientController {

    constructor(
        private readonly redis: RedisService,
        private readonly service: ClientService
    ) { }

    @Get('/')
    async findUnique(@clientLoggedIn() client: any) {
        return await this.service.findById(client.id)
    }

    @Patch('/')
    async update(@clientLoggedIn() client: any, @Body() data: updateClientDto) {
        return await this.service.update(client.id, data)
    }

    @Patch('/profile-picture')
    @UseInterceptors(FileInterceptor('file'))
    
    async uploadProfilePicture(
        @UploadedFile() file: Express.Multer.File, 
        @clientLoggedIn() client: any
    ) {
        return await this.service.updateProfilePicture(file, client.id)
    }



}
