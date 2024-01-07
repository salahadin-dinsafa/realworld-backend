import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { APP_PIPE } from '@nestjs/core/constants';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi/lib/index';

import { AuthModule } from './auth/auth.module';
import { ormConfig } from './common/db/ormconfig.datasource';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_USER: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
            })
        }),
        TypeOrmModule.forRootAsync({
            useFactory: ormConfig,
        }),
        AuthModule,
    ],
    providers: [
        {
            provide: APP_PIPE,
            useFactory: () => new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
                transformOptions: { enableImplicitConversion: true }
            })
        }

    ]
})

export class AppModule { }