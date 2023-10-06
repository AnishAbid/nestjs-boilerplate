import { Module } from "@nestjs/common";
import {AuthController} from './auth.controller'
import {AuthService} from './auth.service'
import {DatabaseModule} from '../database/database.module'
import {databaseProviders} from '../database/database.providers'

@Module({
    imports:[],
    providers:[AuthService],
    controllers:[AuthController],
    
})
export class AuthModule{}