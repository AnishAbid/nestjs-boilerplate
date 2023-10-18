import {Inject, Injectable, NotFoundException, UnprocessableEntityException, HttpException,HttpStatus} from '@nestjs/common';
import {SignUpObj,SignInObj} from './auth.interface'
import {Model} from "mongoose";
import { throwError } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import {ResUser} from './auth.interface'
import Utils from '../utils'

@Injectable({})
export class AuthService {
    constructor(private UserService: UserService,  private jwtService: JwtService){}
    async signup(data){
        const hash = Utils.generateHash(data.password)
        data.password = hash
        let result = await this.UserService.create(data)
        console.log("Recived Res User:",result)
        return result
    }
    async signin({email,password}){
        let result = await this.UserService.findByEmail(email)
        if(!result)
            throw new NotFoundException("email or password is not correct.");
        if(Utils.compaireHash(password,result.password))
            throw new NotFoundException("email or password is not correct.");
    const payload = { sub: result._id, email:result.email };
    let user = new ResUser(result)
    return {
      access_token: await this.jwtService.signAsync(payload),
      user
    };
    }
    
}