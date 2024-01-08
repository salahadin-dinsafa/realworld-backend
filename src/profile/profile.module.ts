import { Module } from "@nestjs/common/decorators/modules/module.decorator";

import { TypeOrmModule } from "@nestjs/typeorm";

import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { UserModule } from "src/user/user.module";
import { UserEntity } from "src/user/entities/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        UserModule
    ],
    controllers: [ProfileController],
    providers: [ProfileService]
})

export class ProfileModule { }