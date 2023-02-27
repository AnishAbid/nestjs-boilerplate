import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {PostsService} from './posts.service'
import { PostModel } from './posts.interface';
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
@Controller('posts')
@ApiTags('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService){ }
    @Get()
    @ApiOkResponse({ description: 'Posts retrieved successfully.'})
    @ApiNotFoundResponse({ description: 'Post not found.' })
    public findAll():PostModel[] {
        return this.postsService.findAll();
    }
    @Get(':id')
    @ApiOkResponse({ description: 'Posts retrieved successfully.'})
    @ApiNotFoundResponse({ description: 'Post not found.' })
    public findOne(@Param('id', ParseIntPipe) id: number): PostModel {
        return this.postsService.findOne(id);
    }
    @Post()
    @ApiCreatedResponse({ description: 'Post created successfully.' })
    @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
    public create(@Body() post: PostModel): PostModel {
        return this.postsService.create(post);
    }
    @Delete(':id')
    @ApiOkResponse({ description: 'Posts Deleted successfully.'})
    @ApiNotFoundResponse({ description: 'Post not found.' })
    public delete(@Param('id', ParseIntPipe) id: number): void {
        this.postsService.delete(id);
    }
    @Put(':id')
    @ApiOkResponse({ description: 'Post updated successfully.'})
    @ApiNotFoundResponse({ description: 'Post not found.' })
    @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
    public update(@Param('id', ParseIntPipe) id: number, @Body() post: PostModel): PostModel {
        return this.postsService.update(id, post);
    }
}


