import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import {AuthModule} from './auth/auth.module'
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [ConfigModule.forRoot({envFilePath: '.env.development',isGlobal:true}), DatabaseModule, AuthModule,PostsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
