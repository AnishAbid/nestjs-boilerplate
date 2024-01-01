import {Inject, Injectable, NotFoundException, UnprocessableEntityException, HttpException,HttpStatus} from '@nestjs/common';
import {SignUpObj,SignInObj} from './auth.interface'
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import {ResUser} from './auth.interface'
import Utils from '../utils'
import Email from '../utils/emails'

@Injectable({})
export class AuthService {
    constructor(private UserService: UserService,  private jwtService: JwtService){}
    async signup(data){
        const hash = Utils.generateHash(data.password)
        data.password = hash
        let result = await this.UserService.create(data)
        Email.AuthEmails({email:data.email},5)
        return {status:true,code:201,data:result}
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
        status:true,code:201,data:{
        access_token: await this.jwtService.signAsync(payload),
        user
      }
    }
    }
    
}