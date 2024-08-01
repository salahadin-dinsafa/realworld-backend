import { Module } from "@nestjs/common/decorators/modules/module.decorator";

import { TypeOrmModule } from "@nestjs/typeorm";

import { UserModule } from "src/user/user.module";
import { UserEntity } from "src/user/entities/user.entity";
import { ProfileService } from "src/profile/profile.service";
import { ProfileController } from "src/profile/profile.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        UserModule
    ],
    controllers: [ProfileController],
    providers: [ProfileService],
    exports: [ProfileService],
})

export class ProfileModule { }