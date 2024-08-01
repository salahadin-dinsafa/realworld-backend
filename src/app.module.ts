import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core/constants';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import * as Joi from 'joi/lib/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config/index';

import { AuthModule } from 'src/auth/auth.module';
import { ProfileModule } from 'src/profile/profile.module';
import { ArticleModule } from 'src/article/article.module';
import { ormConfig } from 'src/common/db/ormconfig.datasource';
import { OptionalJwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { AllExceptionFilter } from 'src/common/filter/all-exception.filter';
import { validationExceptionFactory } from 'src/common/filter/dto.exception';

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
        ArticleModule,
        ProfileModule,
        AuthModule,
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