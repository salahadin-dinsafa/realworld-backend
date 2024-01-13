import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { NotFoundException, UnprocessableEntityException } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserEntity } from "src/user/entities/user.entity";
import { IProfile } from "./interfaces/profile.interface";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async findByNameWithFollower(username: string): Promise<UserEntity> {
        try {
            return await this.userRepository.findOne({ where: { username }, relations: ['follower'] })
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }
    async findByNameWithFollowing(username: string): Promise<UserEntity> {
        try {
            return await this.userRepository.findOne({ where: { username }, relations: ['following'] })
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }

    async findByNameWithLikesAndFollowing(username: string): Promise<UserEntity> {
        try {
            return await this.userRepository.findOne({ where: { username }, relations: ['following', 'likes'] })
        } catch (error) {

        }
    }



    async follow(username: string, currentUser: UserEntity): Promise<IProfile> {
        let user: UserEntity = await this.findByNameWithFollower(username);
        if (!user) throw new NotFoundException()
        let cUser = await this.findByNameWithFollowing(currentUser.username);

        try {
            user.follower.push(cUser);
            cUser.following.push(user);
            return this.getProfile(await user.save(), await cUser.save());
        } catch (error) {
            throw new UnprocessableEntityException(error.message)
        }
    }
    async unFollow(username: string, currentUser: UserEntity): Promise<IProfile> {
        let user: UserEntity = await this.findByNameWithFollower(username);
        if (!user) throw new NotFoundException()

        let cUser = await this.findByNameWithFollowing(currentUser.username);

        const liked: boolean = user.follower.findIndex(user => user.id === currentUser.id) !== -1;
        if (liked) {
            user.follower = user.follower.filter(user => user.id !== cUser.id);
            cUser.following = cUser.following.filter(u => u.id !== user.id);
        }

        try {

            return this.getProfile(await user.save(), await cUser.save());
        } catch (error) {
            throw new UnprocessableEntityException(error.message)
        }
    }


    async find(username: string, currentUser: UserEntity): Promise<IProfile> {
        let user: UserEntity = await this.findByNameWithFollower(username);
        if (!user) throw new NotFoundException('user not found');

        try {
            return this.getProfile(user, currentUser);
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }


    getProfile(user: UserEntity, currentUser: UserEntity): IProfile {
        const following: boolean = user.follower.findIndex(user => user.id === currentUser?.id) !== -1
        return ({
            profile: {
                username: user.username,
                bio: user.bio,
                image: user.image,
                following
            }
        })
    }
}