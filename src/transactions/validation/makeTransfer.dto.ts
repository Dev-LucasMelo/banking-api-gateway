import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsDecimal } from "class-validator"

export class makeTransferDto {
    @ApiProperty({
        description: 'bankingAccountNumber',
        example: "17898490",
    })

    @IsDefined({ message: "O campo bankingAccountNumber é obrigatório" })
    @IsNotEmpty({ message: "O campo bankingAccountNumber não pode ser vazio" })
    bankingAccountNumber: string

    @ApiProperty({
        description: 'bankingAgencyNumber',
        example: "62273",
    })
    @IsDefined({ message: "O campo bankingAgencyNumber é obrigatório" })
    @IsNotEmpty({ message: "O campo bankingAgencyNumber não pode ser vazio" })
    bankingAgencyNumber: string

    @ApiProperty({
        description: 'amount',
        example: "1.25",
    })
    @IsDefined({ message: "O campo amount é obrigatório" })
    @IsNotEmpty({ message: "O campo amount não pode ser vazio" })
    @IsDecimal({ decimal_digits: '2' }, { message: "O campo amount deve ser decimal" })
    amount: string

    @ApiProperty({
        description: 'description',
        example: "twes",
    })
    @IsOptional()
    @IsNotEmpty({ message: "O campo description não pode ser vazio" })
    description: string
}
export class makeTransferResponseDto {
    @ApiProperty({
        description: 'Id da transação',
        example: "bb5a8558-473e-4fa1-b443-d1ccdd22e4b0",
    })
    transactionId: string

    @ApiProperty({
        description: 'status da transação ',
        example: 'pendente',
    })
    status: string
}