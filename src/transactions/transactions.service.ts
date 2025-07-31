import { BadRequestException, Injectable } from '@nestjs/common';
import { KafkaService } from 'src/kafka/kafka.service';
import { makeTransferDto } from './validation/makeTransfer.dto';
import { v4 } from 'uuid';
import { eventData } from './types/event.types';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TransactionsService {
    private readonly BaseUrlTransactions: string;

    constructor(
        private readonly kafkaService: KafkaService,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.BaseUrlTransactions = String(this.configService.get<string>('BASE_URL_TRANSACTIONS_SERVICE'));
    }

    async sendTransfer(data: makeTransferDto, clientId: string) {

        const evento: eventData = {
            id: v4(),
            type: "transaction.started",
            date: new Date().toISOString(),
            payload: {
                senderClientId: clientId,
                ...data
            }
        };

        await this.kafkaService.emit('transactions_topic', evento);

        return {
            transactionId: evento.id,
            status: "pendente"
        }
    }

    async getTransfers(clientId: string) {
        return await firstValueFrom(
            this.httpService.get(`${this.BaseUrlTransactions}transactions/client/${clientId}`)
        ).then((response) => {
            return response.data;
        }).catch((err) => {
            throw new BadRequestException('Erro ao buscar transações');
        });
    }
}
