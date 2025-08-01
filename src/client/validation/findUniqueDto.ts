import { ApiProperty } from "@nestjs/swagger"
import { findUniqueResponseType } from "../types/findUnique.types"

export class findUniqueResponseDto {

    @ApiProperty({
        description: 'Mensagem de retorno referente a operação',
        example: 'Cliente encontrado com sucesso !',
    })
    message: string

    @ApiProperty({
        description: 'Dados do cliente',
        example: {
            "id": "01e123fd-54ae-4365-a83f-3a5c3f6a9cd3",
            "nome_completo": "cliente 2",
            "email": "lucas@gmail.com",
            "url_perfil": "teste",
            "Conta": {
                "id": "704d6e9d-b10d-49d8-9a06-b2a449550e2a",
                "numero_conta": "53961360",
                "agencia": "07078",
                "saldo": "0.25"
            },
            "Endereco": {
                "cep": "55294310",
                "cidade": "Garanhuns",
                "bairro": "atualizado pela api gateway",
                "rua": "teste"
            }
        },
    })
    result: findUniqueResponseType
}  