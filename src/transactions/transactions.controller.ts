import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { JWTguard } from 'src/auth/jwt.guard';
import { TransactionsService } from './transactions.service';
import { makeTransferDto } from './validation/makeTransfer.dto';
import { clientLoggedIn } from 'src/auth/decorators/clientLoggedIn.decorator';

@UseGuards(JWTguard)
@Controller('transactions')
export class TransactionsController {

    constructor(
        private readonly service: TransactionsService
    ) { }

    @Post('/')
    async makeTransfer(@Body() data: makeTransferDto, @clientLoggedIn() client: any) {
        return await this.service.sendTransfer(data, client.id)
    }

    @Get('/')
    async getTransfers(@clientLoggedIn() client: any) {
        return await this.service.getTransfers(client.id)
    }
}

