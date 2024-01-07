import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { UnprocessableEntityException } from "@nestjs/common";

import { IRegistration } from "./interface/registration.interface";
import { IUser } from "src/user/interface/user.interface";

@Injectable()
export class AuthService {


    async register(registration: IRegistration): Promise<any> {
        try {

        } catch (error) {
            throw new UnprocessableEntityException(error.message);
        }
    }
}