import { ApiProperty } from "@nestjs/swagger";


export class logoutResponseDto {

    @ApiProperty({
        description: 'Mensagem de retorno referente a sessão finalizada',
        example: 'Sessão finalizada',
    })
    
    message: string
}