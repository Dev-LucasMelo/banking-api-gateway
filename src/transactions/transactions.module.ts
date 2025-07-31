import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { KafkaModule } from 'src/kafka/kafka.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [KafkaModule, HttpModule],
  providers: [TransactionsService],
  controllers: [TransactionsController]
})
export class TransactionsModule { }
