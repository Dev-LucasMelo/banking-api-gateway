import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { clientLoggedIn } from 'src/auth/decorators/clientLoggedIn.decorator';
import { JWTguard } from 'src/auth/jwt.guard';
import { RedisService } from 'src/redis/redis.service';
import { ClientService } from './client.service';
import { updateClientDto, updateClientResponseDto } from './validation/updateClientDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { findUniqueResponseDto } from './validation/findUniqueDto';
import { uploadPictureDto, uploadPictureResponseDto } from './validation/uploadPictureDto';

@ApiTags('client')
@UseGuards(JWTguard)
@Controller('client')
export class ClientController {

    constructor(
        private readonly redis: RedisService,
        private readonly service: ClientService
    ) { }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retorna dados do cliente logado' })
    @ApiResponse({
        status: 200,
        description: 'Cliente encontrado com sucesso',
        type: findUniqueResponseDto
    })

    @Get('/')
    async findUnique(@clientLoggedIn() client: any) {
        return await this.service.findById(client.id)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'atualiza dados do cliente' })
    @ApiBody({ type: updateClientDto })
    @ApiResponse({
        status: 200,
        description: 'Cliente atualizado com sucesso',
        type: updateClientResponseDto
    })

    @Patch('/')
    async update(@clientLoggedIn() client: any, @Body() data: updateClientDto) {
        return await this.service.update(client.id, data)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'atualiza foto do perfil do cliente' })
    @ApiBody({ type: uploadPictureDto, description: 'upload de arquivo' })
    @ApiResponse({
        status: 200,
        description: 'Foto de perfil atualizada com sucesso',
        type: uploadPictureResponseDto
    })

    @Patch('/profile-picture')
    @UseInterceptors(FileInterceptor('file'))
    async uploadProfilePicture(
        @UploadedFile() file: Express.Multer.File,
        @clientLoggedIn() client: any
    ) {
        return await this.service.updateProfilePicture(file, client.id)
    }

}
