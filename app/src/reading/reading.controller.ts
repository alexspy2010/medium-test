import { Controller, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { JwtAuthGuard } from 'src/user/strategy/jwt-auth.guard';

@Controller('api/reading')
export class ReadingController {
    constructor(private readonly readingService: ReadingService) { }

    @Post(":id")
    @UseGuards(JwtAuthGuard)
    async startRead(@Param("id") id: number, @Req() req): Promise<CustomAnswer> {
        return this.readingService.startRead(id, req.user.id, req.user.uuid);
    }

    @Put(":id")
    @UseGuards(JwtAuthGuard)
    async endRead(@Param("id") id: number, @Req() req): Promise<CustomAnswer> {
        return this.readingService.endRead(id, req.user.id, req.user.uuid);
    }
}
