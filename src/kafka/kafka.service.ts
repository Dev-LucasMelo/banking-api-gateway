import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_CLIENT } from './kafka.constants';

@Injectable()
export class KafkaService implements OnModuleInit {

    constructor(
        @Inject(KAFKA_CLIENT)
        private readonly kafkaClient: ClientKafka,
    ) { }

    async onModuleInit() {
        await this.kafkaClient.connect();
    }

    async emit(topic: string, message: any) {
        return this.kafkaClient.emit(topic, message);
    }
}