import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dataSource, { safeInit } from './data-source/data-source';
import { BookModule } from './modules/book/book.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './modules/auth/guard/jwt.guard';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      dataSourceFactory: async () => {
        const newDataSource = safeInit(dataSource);
        return newDataSource;
      },
      useFactory: () => ({
        autoLoadEntities: true,
      }),
    }),
    WinstonModule.forRoot({
      level: 'debug',
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    }),
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    BookModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
