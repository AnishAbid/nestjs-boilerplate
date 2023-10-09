import {Inject, Injectable, NotFoundException, UnprocessableEntityException, HttpException,HttpStatus} from '@nestjs/common';
import {SignUpObj,SignInObj} from './auth.interface'
import {Model} from "mongoose";
import { throwError } from 'rxjs';
import { UserService } from 'src/user/user.service';
@Injectable({})
export class AuthService {
    constructor(private UserService: UserService){}
    async signup(data){
        let result = await this.UserService.create(data)
        return result
    }
    async signin(data){
        let result = await this.UserService.findOne(data)
        if(!result)
            throw new NotFoundException("email or password is not correct.");
        if(result.password == data.password)
            return result
            else
            throw new NotFoundException("email or password is not correct.");
    }
    
}