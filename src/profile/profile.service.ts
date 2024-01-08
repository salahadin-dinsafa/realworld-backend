import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { NotFoundException, UnprocessableEntityException } from "@nestjs/common";

import { UserEntity } from "src/user/entities/user.entity";
import { IProfile } from "./interfaces/profile.interface";
import { UserService } from "src/user/user.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly userService: UserService,
    ) { }

    async findByName(username: string): Promise<UserEntity> {
        try {
            return await this.userRepository.findOne({ where: { username } })
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }


    async find(username: string, currentUser: UserEntity): Promise<IProfile> {
        let user: UserEntity = await this.findByName(username);
        if (!user) throw new NotFoundException('user not found');

        try {
            return this.getProfile(user);
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }


    getProfile(user: UserEntity): IProfile {
        return ({
            profile: {
                username: user.username,
                bio: user.bio,
                image: user.image,
                following: false,
            }
        })
    }
}