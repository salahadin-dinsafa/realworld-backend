import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { APP_GUARD, APP_PIPE } from '@nestjs/core/constants';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config/index';
import * as Joi from 'joi/lib/index';

import { AuthModule } from './auth/auth.module';
import { ormConfig } from './common/db/ormconfig.datasource';
import { OptionalJwtAuthGuard } from './common/guard/jwt-auth.guard';
import { ProfileModule } from './profile/profile.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.number().required(),
                DB_USER: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
            })
        }),
        TypeOrmModule.forRootAsync({
            useFactory: ormConfig,
        }),
        AuthModule,
        ProfileModule,
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
        },
        {
            provide: APP_GUARD,
            useClass: OptionalJwtAuthGuard
        }

    ]
})

export class AppModule { }