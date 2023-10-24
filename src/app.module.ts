import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import {AuthModule} from './auth/auth.module'
import { DatabaseModule } from './database/database.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
/* 
GraphQl config:
playground set true to enable playgound.
csrfPrevention set false to disable cors.
autoSchemaFile path for auto schema file.  
*/
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      csrfPrevention: false,
      autoSchemaFile: join(process.cwd(), 'src/graphQl/schema.gql'),
    }),
    ConfigModule.forRoot({envFilePath: '.env.development',isGlobal:true}),
   DatabaseModule,
    AuthModule,
    PostsModule,
     UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
