import {Inject, Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {SignUpObj,SignInObj} from './auth.interface'
import {Model} from "mongoose";
@Injectable({})
export class AuthService {
    constructor(@Inject('USER_MODEL') private readonly userModel: any){}
    async signup(data){
        let result = await this.userModel.create(data)
        return result
    }
    async signin(data){
        let result = await this.userModel.findOne({id:data.id})
        return result
    
    }
    
}