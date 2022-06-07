import { Account } from 'src/accounts/entities/account.entity';
import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'src/documents/entities/document.entity';
import { Service } from 'src/services/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Document, Service]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
