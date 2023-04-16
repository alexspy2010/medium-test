import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ratings } from './entity/rating.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { VoteDto } from './dto/vote.dto';
import { Posts } from '../post/entity/post.entity';
import { Users } from 'src/user/entity/user.entity';

@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(Ratings) private ratingsRepository: Repository<Ratings>,
        @InjectRepository(Posts) private postsRepository: Repository<Posts>,
        private dataSource: DataSource
    ) { }
    
    /**
     * Vote for post
     * @param postParam 
     * @param user_id 
     * @returns 
     */
    public async vote(postParam: VoteDto, user_id: number): Promise<CustomAnswer> {
        const oPost = await this.postsRepository.findOne({
            where: { id: postParam.id }
        });

        if (!oPost ) {
            throw new HttpException(
                `Post not found`,
                HttpStatus.NOT_FOUND,
            );
        }
        try {
            const oRating: Ratings = await this.ratingsRepository.create({
                user_id: user_id,
                post_id: oPost.id,
                rating: postParam.rating
            });
            await this.ratingsRepository.save(oRating);
        } catch(_) {
            throw new HttpException(
                `You vouted early`,
                HttpStatus.BAD_REQUEST,
            );
        }
        
        await this.dataSource.transaction(async (transactionManager: EntityManager) => {            
            const avgRating = await transactionManager.getRepository(Ratings)
                .createQueryBuilder("Ratings")
                .where('post_id=:id', { id: oPost.id })
                .select('AVG(rating)', 'avg')
                .getRawOne();
            
            await transactionManager.getRepository(Posts)
                .save({
                    id: postParam.id,
                    rating: avgRating.avg ?? 0
                });
            
            const avgUserRating = await transactionManager.getRepository(Posts)
                .createQueryBuilder("Posts")
                .where('user_id=:id AND rating<>0', { id: oPost.user_id })
                .select('AVG(rating)', 'avg')
                .getRawOne();

            await transactionManager.getRepository(Users)
                .save({
                    id: oPost.user_id,
                    rating: avgUserRating.avg ?? 0
                });
        });
        return {
            message: 'Rating accepted',
            code: '0'
        };
    }
}
