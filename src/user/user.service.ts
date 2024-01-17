import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";

import { UserEntity } from "./entities/user.entity";
import { UnprocessableEntityException } from "@nestjs/common";
import { IRegistration } from "src/auth/interface/registration.interface";
import { IUser } from "./interface/user.interface";
import { IUpdate } from "./interface/update.interface";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) { }

    // Auth
    async create(registration: IRegistration): Promise<UserEntity> {
        try {
            return await this.userRepository.save({
                ...registration.user,
                password: await argon.hash(registration.user.password),
            })
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY')
                throw new UnprocessableEntityException('user already exist');
            throw new UnprocessableEntityException(error.message);
        }

    }

    async update(user: UserEntity, update: IUpdate): Promise<IUser> {
        Object.assign(user, update.user);
        if (update.user.password)
            user.password = await argon.hash(update.user.password);

        try {
            return await this.getUser(await user.save());
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }

    async findByEmail(email: string): Promise<UserEntity> {
        try {
            return await this.userRepository.findOne({ where: { email } });
        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }

    }

    async getUser(user: UserEntity): Promise<IUser> {
        return ({
            user: {
                username: user.username,
                email: user.email,
                bio: user.bio,
                image: user.image,
                token: await this.jwtService.signAsync({ 'email': user.email }, {
                    secret: process.env.JWT_SECRET,
                })
            }
        })
    }
}