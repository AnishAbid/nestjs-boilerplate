import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module';
import {userProviders} from './providers/user.providers'
import {UserService} from './user.service'
import {UserController} from './user.controller'
import {UserResolver} from './gql/user.resolver'
@Module({
    imports:[DatabaseModule],
    controllers:[UserController],
    providers:[UserService, UserResolver, ...userProviders],
    exports:[UserService]
})
export class UserModule {}
