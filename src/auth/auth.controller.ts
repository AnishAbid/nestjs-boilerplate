import { Body, Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import {SignInObj,SignUpObj} from "./auth.interface"
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService:AuthService) {
        }

    @Post('signup')
    @ApiCreatedResponse({ description: 'User created successfully.' })
    @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
    signUp(@Body() data:SignUpObj){
        return this.authService.signup(data)
    }
    @Post('signin')
    @ApiOkResponse({ description: 'User loggedin successfully.'})
    @ApiNotFoundResponse({ description: 'User not found.' })
    @ApiUnprocessableEntityResponse({ description: 'Somthing  went wrong' })
    signIn(@Body() data:SignInObj){
        return this.authService.signin(data)
    }
}