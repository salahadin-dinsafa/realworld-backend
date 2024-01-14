import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core/constants';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config/index';
import * as Joi from 'joi/lib/index';

import { AuthModule } from './auth/auth.module';
import { ormConfig } from './common/db/ormconfig.datasource';
import { OptionalJwtAuthGuard } from './common/guard/jwt-auth.guard';
import { ProfileModule } from './profile/profile.module';
import { ArticleModule } from './article/article.module';
import { AllExceptionFilter } from './common/filter/all-exception.filter';
import { validationExceptionFactory } from './common/filter/dto.exception';

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
        ArticleModule,
    ],
    providers: [
        {
            provide: APP_PIPE,
            useFactory: () => new ValidationPipe({
                exceptionFactory: validationExceptionFactory,
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
                transformOptions: { enableImplicitConversion: true }
            })
        },
        {
            provide: APP_GUARD,
            useClass: OptionalJwtAuthGuard
        },
        {
            provide: APP_FILTER,
            useClass: AllExceptionFilter
        },

    ]
})

export class AppModule { }