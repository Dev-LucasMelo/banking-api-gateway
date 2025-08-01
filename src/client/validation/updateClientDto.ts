import { IsEmail, IsNotEmpty, IsString, Length, ValidateNested, IsDefined, IsNotEmptyObject } from 'class-validator';
import { Type } from 'class-transformer';
import { enderecoDto } from './enderecoDTO';
import { ApiProperty } from '@nestjs/swagger';

export class updateClientDto {
    @ApiProperty({
        description: 'name',
        example: 'cliente 2',
    })

    @IsNotEmpty({ message: "O campo name não pode ser vazio" })
    @IsString({ message: "O campo name deve ser do tipo texto" })
    @Length(3, 100, { message: "O campo name deve conter entre 11 e 20 caracteres" })
    name: string;

    @ApiProperty({
        description: 'email',
        example: 'teste@gmail.com',
    })

    @IsNotEmpty({ message: "O campo email não pode ser vazio" })
    @IsEmail({}, { message: "O email informado é inválido." })
    @Length(5, 30, { message: "O campo email deve conter entre 6 e 30 caracteres" })
    email: string;

    @ApiProperty({
        description: 'dados de endereco',
        example: {
            "numero": "1",
            "rua": "teste",
            "bairro": "brasilia",
            "cidade": "Garanhuns",
            "cep": "55294310"
        }
    })

    @IsDefined({ message: "É obrigatório definir os campos de endereço." })
    @IsNotEmptyObject({ nullable: false }, { message: 'O endereço não pode ser nulo ou vazio.' })
    @ValidateNested()
    @Type(() => enderecoDto)
    endereco: enderecoDto;

}

export class updateClientResponseDto {
    @ApiProperty({
        description: 'Mensagem de retorno referente a operação',
        example: 'Dados atualizados com sucesso!',
    })
    message: string

    @ApiProperty({
        description: 'Resultado da operação',
        example: {
            "client": {
                "id": "01e123fd-54ae-4365-a83f-3a5c3f6a9cd3",
                "nome_completo": "cliente 2",
                "cpf": "12345678900",
                "email": "lucas@gmail.com",
                "senha": "$2b$10$P3giZSDmMMw03U2hCThVluQyPDrZVvhW8TDTYraE6F2Jbt4RVWQsa",
                "url_perfil": null,
                "criado_em": "2025-07-29T00:48:27.471Z",
                "atualizado_em": "2025-07-31T16:10:34.127Z"
            },
            "address": {
                "id": "a51c12ca-bb7b-43e3-ad6f-83aa7d88157d",
                "numero": "1",
                "rua": "teste",
                "bairro": "atualizado pela api gateway",
                "cidade": "Garanhuns",
                "status": "ativo",
                "cep": "55294310",
                "criado_em": "2025-07-29T15:37:01.926Z",
                "atualizado_em": "2025-07-31T16:10:34.147Z",
                "cliente_id": "01e123fd-54ae-4365-a83f-3a5c3f6a9cd3"
            }
        }
    })
    result: any
}