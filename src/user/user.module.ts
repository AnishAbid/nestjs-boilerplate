import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module';
import {userProviders} from './providers/user.providers'
import {UserService} from './user.service'

@Module({
    imports:[DatabaseModule],
    providers:[UserService,...userProviders],
    exports:[UserService]
})
export class UserModule {}
