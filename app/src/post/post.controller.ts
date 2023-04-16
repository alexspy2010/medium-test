import { Controller, ValidationPipe, UsePipes, Param, Put, Delete, Body, UseGuards, Query, Res, Req, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from '../user/strategy/jwt-auth.guard';
import { Get, Post } from '@nestjs/common';
import { Posts } from './entity/post.entity';
import { Paginate } from '../interface/paginate';
import { PagingDto } from '../dto/paging.dto';
import { PostCreateDto } from './dto/post.create.dto';
import { PostDto } from './dto/post.dto';

@Controller('api/post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get()
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll(@Query() query: PagingDto): Promise<Paginate<Posts>> {
        return await this.postService.getAllPost(query);
    }

    @Get(":id")
    @UseInterceptors(ClassSerializerInterceptor)
    async getById(@Param("id") id: number): Promise<Posts> {
        return await this.postService.getOnePost(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    async create(@Body() postParam: PostCreateDto, @Req() req): Promise<Posts> {
        return this.postService.createPost(postParam, req.user.id);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    async update(@Body() postParam: PostDto): Promise<Posts> {
        return await this.postService.updatePost(postParam);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    async deletePost(@Param("id") id: number, @Req() req): Promise<CustomAnswer> {
        return await this.postService.deletePost(id, req.user.id);
    }
}
