import { IsNotEmpty, Length, IsEmail, IsString } from "class-validator"
import { clienteType, contaType } from "../types/register.types";
import { ApiProperty } from "@nestjs/swagger";

export class registerDto {

    @ApiProperty({
        description: 'name',
        example: 'name teste',
    })
    @IsNotEmpty({ message: "O campo name não pode ser vazio" })
    @IsString({ message: "O campo name deve ser do tipo texto" })
    @Length(3, 100, { message: "O campo name deve conter entre 11 e 20 caracteres" })
    name: string;

    @ApiProperty({
        description: 'cpf',
        example: '12345678900',
    })
    @IsNotEmpty({ message: "O campo cpf não pode ser vazio" })
    @IsString({ message: "O campo cpf deve ser do tipo texto" })
    @Length(11, 20, { message: "O campo cpf deve conter entre 11 e 20 caracteres" })
    cpf: string;

    @ApiProperty({
        description: 'email',
        example: 'teste@gmail.com',
    })
    @IsNotEmpty({ message: "O campo email não pode ser vazio" })
    @IsEmail({}, { message: "O email informado é inválido." })
    @Length(5, 30, { message: "O campo email deve conter entre 6 e 30 caracteres" })
    email: string;

    @ApiProperty({
        description: 'password',
        example: '12345678',
    })
    @IsNotEmpty({ message: "O campo password não pode ser vazio" })
    @IsString({ message: "O campo password deve ser do tipo texto" })
    @Length(6, 30, { message: "O campo password deve conter entre 6 e 30 caracteres" })
    password: string;
}

export class registerResponseDto {
    @ApiProperty({
        description: 'retorna entidade cliente',
        example: {
            "id": "01e123fd-54ae-4365-a83f-3a5c3f6a9cd3",
            "nome_completo": "lucas Messias dev",
            "cpf": "12345678900",
            "email": "messias@gmail.com",
            "senha": "$2b$10$P3giZSDmMMw03U2hCThVluQyPDrZVvhW8TDTYraE6F2Jbt4RVWQsa",
            "url_perfil": null,
            "criado_em": "2025-07-29T00:48:27.471Z",
            "atualizado_em": "2025-07-29T00:48:27.471Z"
        },
    })
    cliente: clienteType

    @ApiProperty({
        description: 'retorna entidade conta',
        example: {
            "id": "704d6e9d-b10d-49d8-9a06-b2a449550e2a",
            "numero_conta": "53961360",
            "agencia": "07078",
            "saldo": "0",
            "tipo": "corrente",
            "status": "ativo",
            "criado_em": "2025-07-29T00:48:27.484Z",
            "atualizado_em": "2025-07-29T00:48:27.484Z",
            "cliente_id": "01e123fd-54ae-4365-a83f-3a5c3f6a9cd3"
        },
    })
    conta: contaType
}