import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Readings } from './entity/reading.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ReadingLogs } from './entity/reading.logs.entity';
import { Posts } from '../post/entity/post.entity';

@Injectable()
export class ReadingService {
    constructor(
        @InjectRepository(Readings) private readingRepository: Repository<Readings>,
        @InjectRepository(ReadingLogs) private readingLogsRepository: Repository<ReadingLogs>,
        @InjectRepository(Posts) private postsRepository: Repository<Posts>,
        private dataSource: DataSource
    ) { }

    public async startRead(post_id: number, user_id: number, uuid: string): Promise<CustomAnswer> {
        const oPost = await this.getPost(post_id);

        try {
            const oReadingLog: ReadingLogs = await this.readingLogsRepository.create({
                user_id: user_id,
                post_id: post_id,
                uuid: uuid
            });
            await this.readingLogsRepository.save(oReadingLog);
        } catch (_) {
            throw new HttpException(
                `You vouted early`,
                HttpStatus.BAD_REQUEST,
            );
        }

        return {
            message: 'Request accepted',
            code: '0'
        };
    }

    public async endRead(post_id: number, user_id: number, uuid: string): Promise<CustomAnswer> {
        const oPost = await this.getPost(post_id);

        const oReadingLog: ReadingLogs = await this.readingLogsRepository.findOne({
            where: { uuid: uuid, end_reading: false }
        });
        if (oReadingLog) {
            await this.dataSource.transaction(async (transactionManager: EntityManager) => {
                await transactionManager.getRepository(ReadingLogs)
                    .save({
                        id: oReadingLog.id,
                        end_reading: true
                    });
                const readingTime = await transactionManager.getRepository(ReadingLogs)
                    .createQueryBuilder("ReadingLogs")
                    .where('id=:id', { id: oReadingLog.id })
                    .select('(julianday(update_at) - julianday(created_at)) * 86400.0', 'read')
                    .getRawOne();
                if (readingTime.read) {
                    const oReading: Readings = await this.readingRepository.create({
                        post_id: oPost.id,
                        reading: readingTime.read
                    });
                    await this.readingRepository.save(oReading);
                }
                const avgReading = await transactionManager.getRepository(Readings)
                    .createQueryBuilder("Readings")
                    .where('post_id=:id', { id: oPost.id })
                    .select('AVG(reading)', 'avg')
                    .getRawOne();

                await transactionManager.getRepository(Posts)
                    .save({
                        id: oPost.id,
                        rating: avgReading.avg ?? 0
                    });
            });
        }

        return {
            message: 'Request accepted',
            code: '0'
        };
    }

    private async getPost(post_id: number): Promise<Posts> {
        try {
            const oPost = await this.postsRepository.findOneOrFail({
                where: { id: post_id }
            });

            return oPost;
        } catch (_) {
            throw new HttpException(
                `Post not found`,
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
