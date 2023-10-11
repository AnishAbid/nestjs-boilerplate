import { Module } from "@nestjs/common";
import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'
import {UserModule} from '../user/user.module'
import { JwtModule } from '@nestjs/jwt';
import {jwtConstants} from './auth.constants'
import {AuthGuard} from './auth.guard'

@Module({
    imports:[UserModule, JwtModule.register({
        global: true,
        secret: jwtConstants.secret
        /* signOptions: { expiresIn: '60s' }, */
      })],
    providers:[AuthService,{
        provide: 'APP_GUARD',
        useClass: AuthGuard,
      }],
    controllers:[AuthController],
    
})
export class AuthModule{}