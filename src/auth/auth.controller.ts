import { Body, ClassSerializerInterceptor, Controller, Post, Req, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {SignInObj,SignUpObj} from "./auth.interface"
import {pbkdf2} from "node:crypto"
import {Public} from "../decorators/custom.decorator"

import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
/* 
@UseInterceptors(ClassSerializerInterceptor)
use this to overwrite/manipulate/serialize incoming or out going object.
*/
@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService:AuthService) {
        }
    @Public()
    @Post('signup')
    /* @ApiCreatedResponse({ description: 'User created successfully.' })
    @ApiUnprocessableEntityResponse({ description: 'User already exists.' }) */
    signUp(@Body() data:SignUpObj){
        return this.authService.signup(data)
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @Public()
    @Post('signin')
/*     @ApiOkResponse({ description: 'User loggedin successfully.'})
    @ApiNotFoundResponse({ description: 'User not found.' })
    @ApiUnprocessableEntityResponse({ description: 'Somthing  went wrong' }) */
    signIn(@Body() data:SignInObj){
        return this.authService.signin(data)
    }
}