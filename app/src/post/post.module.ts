import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/user/entity/user.entity';
import { Posts } from './entity/post.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Posts]), UserModule
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule { }
