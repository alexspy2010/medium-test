import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { RatingModule } from './rating/rating.module';
import { ReadingModule } from './reading/reading.module';

@Module({
  imports: [DatabaseModule, UserModule, PostModule, RatingModule, ReadingModule]
})
export class AppModule {}
