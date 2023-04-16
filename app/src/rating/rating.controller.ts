import { Body, Controller, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../user/strategy/jwt-auth.guard';
import { VoteDto } from './dto/vote.dto';
import { RatingService } from './rating.service';

@Controller('api/rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService) { }

    @Put()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    async vote(@Body() postParam: VoteDto, @Req() req): Promise<CustomAnswer> {
        return this.ratingService.vote(postParam, req.user.id);
    }
}
