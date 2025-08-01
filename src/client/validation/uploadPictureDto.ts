import { ApiProperty } from "@nestjs/swagger";

export class uploadPictureDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}

export class uploadPictureResponseDto {
    @ApiProperty({
        description: 'Mensagem de retorno referente a operação',
        example: "Foto de perfil atualizada com sucesso !",
    })
    message: string

}