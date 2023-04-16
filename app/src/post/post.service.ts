import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Paginate } from '../interface/paginate';
import { PagingDto } from 'src/dto/paging.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entity/post.entity';
import { Repository } from 'typeorm';
import { PostCreateDto } from './dto/post.create.dto';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Posts) private postsRepository: Repository<Posts>
    ) { }

    /**
     * Get all posts with paginate
     * @param {PagingDto} query 
     * @returns {Promise<Paginate<Posts>>}
     */
    public async getAllPost(query: PagingDto): Promise<Paginate<Posts>> {
        const [result, total] = await this.postsRepository.findAndCount(
            {
                take: query.take ?? 10,
                skip: query.skip ?? 0,
                relations: ['user']
            }
        );
        return {
            data: result,
            count: total
        }
    }

    /**
     * Get Post By id
     * @param {number} id 
     * @returns {Promise<Posts>}
     * @throws {HttpException}
     */
    public async getOnePost(id: number): Promise<Posts> {
        const oPost = await this.postsRepository.findOne({
            where: { id },
            relations: ['user']
        });

        if (!oPost) {
            throw new HttpException(
                `Post not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        return oPost;
    }

    /**
     * Create post
     * @param {PostCreateDto} postDto 
     * @param {number} user 
     * @returns { Promise<Posts>}
     */
    public async createPost(postDto: PostCreateDto, user: number): Promise<Posts> {
        const { title, content } = postDto;
        const oPost: Posts = await this.postsRepository.create({
            title: title,
            content: content,
            user_id: user
        });
        return await this.postsRepository.save(oPost);
    }

    /**
     * Update post
     * @param {PostDto} postDto 
     * @returns {Promise<Posts>}
     */
    public async updatePost(postDto: PostDto): Promise<Posts> {
        const { id } = postDto;
        const oPost = await this.postsRepository.findOne({
            where: { id },
        });
        if (!oPost) {
            throw new HttpException(
                `Post not found`,
                HttpStatus.NOT_FOUND,
            );
        }
        return await this.postsRepository.save(postDto);
    }

    /**
     * delete post by id
     * @param {number} id 
     */
    public async deletePost(id: number, user_id: number): Promise<CustomAnswer> {
        const oPost = await this.postsRepository.findOne({
            where: { id }
        });
        if (!oPost || oPost.user_id !== user_id) {
            throw new HttpException(
                `Post not found`,
                HttpStatus.NOT_FOUND,
            );
        }
        await this.postsRepository.delete(id);
        return {
            message: 'Post deleted',
            code: '0'
        };
    }
}
