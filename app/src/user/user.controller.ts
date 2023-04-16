import { Body, Controller, ValidationPipe, Post, UsePipes, UseInterceptors, ClassSerializerInterceptor, Req, Res, Get, UseGuards, Query } from '@nestjs/common';
import { UserCreateDto } from './dto/user.create.dto';
import { Users } from './entity/user.entity';
import { UserService } from './user.service';
import { UsersDTO } from './dto/users.dto';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';
import { PagingDto } from 'src/dto/paging.dto';
import { Paginate } from 'src/interface/paginate';

@Controller('api/user')
export class UserController {
    constructor(private authService: UserService) { }

    /**
     * Auth user
     * @param req 
     * @param res 
     * @param body 
     */
    @Post('login')
    @UsePipes(new ValidationPipe())
    public async login(@Req() req, @Res() res, @Body() body: UsersDTO) {
        const auth = await this.authService.login(body);
        res.status(auth.status).json(auth.msg);
    }

    /**
     * Register user
     * @param body 
     * @returns {Promise<Users>}
     */
    @Post('register')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(ClassSerializerInterceptor)
    public async register(@Body() body: UserCreateDto): Promise<Users> {
        const auth = await this.authService.createUser(body);
        return auth;
    }

    /**
     * Get all registered users
     * @returns {Promise<Users[]>}
     */
    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    public async getAllUsers(@Query() query: PagingDto): Promise<Paginate<Users>> {
        return this.authService.getAllUsers(query);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    public async getProfile(@Req() req) {
        return req.user;
    }
}
