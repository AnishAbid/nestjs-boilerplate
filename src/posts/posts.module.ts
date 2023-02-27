import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postProviders } from './providers/post.providers';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [PostsService,...postProviders],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
