import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { JWTguard } from 'src/auth/jwt.guard';
import { TransactionsService } from './transactions.service';
import { makeTransferDto, makeTransferResponseDto } from './validation/makeTransfer.dto';
import { clientLoggedIn } from 'src/auth/decorators/clientLoggedIn.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { getTransfersDto } from './validation/getTransfers.dto';

@UseGuards(JWTguard)
@Controller('transactions')
export class TransactionsController {

    constructor(
        private readonly service: TransactionsService
    ) { }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Inicia transferencia' })
    @ApiBody({ type: makeTransferDto })
    @ApiResponse({
        status: 200,
        description: 'Retorna status da transferencia',
        type: makeTransferResponseDto
    })

    @Post('/')
    async makeTransfer(@Body() data: makeTransferDto, @clientLoggedIn() client: any) {
        return await this.service.sendTransfer(data, client.id)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'lista transferencias do cliente logado' })
    @ApiResponse({
        status: 200,
        description: 'Retorna status da transferencia',
        type: getTransfersDto,
        isArray: true
    })

    @Get('/')
    async getTransfers(@clientLoggedIn() client: any) {
        return await this.service.getTransfers(client.id)
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'retorna detalhes da transferencia por id' })
    @ApiResponse({
        status: 200,
        description: 'Retorna detalhes da transferencia',
        example: {
            "id": "d723978c-8523-42d7-943a-a6ab97629a38",
            "tipo": "TED",
            "descricao": "twes",
            "status": "realizado",
            "valor": "10.00",
            "cliente_origem": {
                "id": "01e123fd-54ae-4365-a83f-3a5c3f6a9cd3",
                "nome_completo": "cliente 2",
                "email": "lucas@gmail.com",
                "Conta": {
                    "id": "704d6e9d-b10d-49d8-9a06-b2a449550e2a",
                    "numero_conta": "53961360",
                    "agencia": "07078"
                }
            },
            "cliente_destino": {
                "id": "907ffe18-77be-4631-84a8-f90be5986331",
                "nome_completo": "lucas messias 2",
                "email": "lucass@gmail.com",
                "Conta": {
                    "id": "b0cd3342-3e6c-4272-a559-24845775ed2e",
                    "numero_conta": "17898490",
                    "agencia": "62273"
                }
            }
        }
    })

    @ApiParam({
        name: "id",
        format: "string"
    })
    @Get('/:id')
    async getTransferDetails(@Param('id') transactionId: string, @clientLoggedIn() client: any) {
        return await this.service.getTransferDetails(transactionId)
    }
}

