import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Ratings } from './entity/rating.entity';
import { PostModule } from 'src/post/post.module';
import { Posts } from '../post/entity/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ratings, Posts]), UserModule, PostModule
  ],
  controllers: [RatingController],
  providers: [RatingService]
})
export class RatingModule { }
