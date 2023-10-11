import {Inject, Injectable, NotFoundException, UnprocessableEntityException, HttpException,HttpStatus} from '@nestjs/common';
import {SignUpObj,SignInObj} from './auth.interface'
import {Model} from "mongoose";
import { throwError } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

import {
    pbkdf2Sync,
  } from 'node:crypto'
const salt = "Givemesomesalt"
@Injectable({})
export class AuthService {
    constructor(private UserService: UserService,  private jwtService: JwtService){}
    async signup(data){
        const hash = pbkdf2Sync(data.password, salt, 10, 256, 'sha256').toString();
        data.password = hash
        let result = await this.UserService.create(data)
        console.log("Recived Res User:",result)
        return result
    }
    async signin({email,password}){
        const hash = pbkdf2Sync(password, salt, 10, 256, 'sha256').toString();
        password = hash
        let result = await this.UserService.findByEmail(email)
        if(!result)
            throw new NotFoundException("email or password is not correct.");
        if(result.password != password)
            throw new NotFoundException("email or password is not correct.");
    const payload = { sub: result._id, email:result.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user:result
    };
    }
    
}