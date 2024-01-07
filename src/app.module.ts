import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ormConfig } from './common/db/ormconfig.datasource';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: ormConfig,
        }),
        AuthModule,
    ],
})

export class AppModule { }