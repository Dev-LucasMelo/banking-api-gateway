import { Injectable } from '@nestjs/common';
import { KafkaService } from 'src/kafka/kafka.service';
import { makeTransferDto } from './validation/makeTransfer.dto';
import { v4 } from 'uuid';
import { eventData } from './types/event.types';

@Injectable()
export class TransactionsService {

    constructor(
        private readonly kafkaService: KafkaService
    ) { }

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
}
