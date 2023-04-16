import { Module } from '@nestjs/common';
import { ReadingController } from './reading.controller';
import { ReadingService } from './reading.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Readings } from './entity/reading.entity';
import { ReadingLogs } from './entity/reading.logs.entity';
import { Posts } from '../post/entity/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Readings, ReadingLogs, Posts]), UserModule
  ],
  controllers: [ReadingController],
  providers: [ReadingService]
})
export class ReadingModule {}
