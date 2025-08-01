import { ApiProperty } from "@nestjs/swagger"

export class getTransfersDto {
    @ApiProperty({
        description: 'id',
        example: "b8f1d114-50a6-4791-920e-d4f2547e4ad9",
    })
    id: string

    @ApiProperty({
        description: 'tipo',
        example: "ted",
    })
    tipo: string

    @ApiProperty({
        description: 'valor',
        example: "10.00",
    })
    valor: string

    @ApiProperty({
        description: 'descricao',
        example: "twes",
    })
    descricao: string

    @ApiProperty({
        description: 'status',
        example: "ativo",
    })
    status: string

    @ApiProperty({
        description: 'criado_em',
        example: "2025-07-31T03:20:08.947Z",
    })
    criado_em: string

    @ApiProperty({
        description: 'atualizado_em',
        example: "2025-07-31T03:20:08.947Z",
    })
    atualizado_em: string

    @ApiProperty({
        description: 'conta_destino_id',
        example: "b0cd3342-3e6c-4272-a559-24845775ed2e",
    })
    conta_destino_id: string

    @ApiProperty({
        description: 'conta_origem_id',
        example: "b0cd3342-3e6c-4272-a559-24845775ed2e",
    })
    conta_origem_id: string
}