import {Inject, Injectable, NotFoundException, UnprocessableEntityException, HttpException,HttpStatus} from '@nestjs/common';
import {SignUpObj,SignInObj} from './auth.interface'
import {Model} from "mongoose";
import { throwError } from 'rxjs';
@Injectable({})
export class AuthService {
    constructor(@Inject('USER_MODEL') private readonly userModel: any){}
    async signup(data){
        let result = await this.userModel.create(data)
        return result
    }
    async signin(data){
        let result = await this.userModel.findOne({email:data.email},{password:0})
        if(!result)
            throw new NotFoundException("email or password is not correct.");
        if(result.password == data.password)
            return result
            else
            throw new NotFoundException("email or password is not correct.");
    }
    
}