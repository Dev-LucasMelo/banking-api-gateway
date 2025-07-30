import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KAFKA_CLIENT } from './kafka.constants';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_CLIENT,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
          },
        },
      },
    ]),
  ],
  providers: [KafkaService],
  exports: [KafkaService]
})
export class KafkaModule { }
