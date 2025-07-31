import { IsDefined, IsNotEmpty, IsNumber, IsOptional,IsDecimal } from "class-validator"

export class makeTransferDto {
    @IsDefined({ message: "O campo bankingAccountNumber é obrigatório" })
    @IsNotEmpty({ message: "O campo bankingAccountNumber não pode ser vazio" })
    bankingAccountNumber: string

    @IsDefined({ message: "O campo bankingAgencyNumber é obrigatório" })
    @IsNotEmpty({ message: "O campo bankingAgencyNumber não pode ser vazio" })
    bankingAgencyNumber: string

    @IsDefined({ message: "O campo amount é obrigatório" })
    @IsNotEmpty({ message: "O campo amount não pode ser vazio" })
    @IsDecimal({decimal_digits: '2'},{message: "O campo amount deve ser decimal"})
    amount: string

    @IsOptional()
    @IsNotEmpty({ message: "O campo description não pode ser vazio" })
    description: string
}