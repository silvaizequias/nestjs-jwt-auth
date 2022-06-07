import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { DocumentsModule } from './documents/documents.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:
        process.env.TYPEORM_SYNCHRONIZE === 'true',
    } as TypeOrmModuleOptions),
    UsersModule,
    AuthModule,
    AccountsModule,
    DocumentsModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
