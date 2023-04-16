import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import * as bcrypt from 'bcryptjs';
import { UsersDTO } from './dto/users.dto';
import { validate } from 'class-validator';
import { JwtPayload } from './dto/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { PagingDto } from 'src/dto/paging.dto';
import { Paginate } from 'src/interface/paginate';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(Users) private usersRepository: Repository<Users>
    ) { }

    /**
     * Regoster new user
     * @param {UserCreateDto} userParam 
     * @returns {Promise<Users>}
     */
    public async createUser(userParam: UserCreateDto): Promise<Users> {
        const { mail, password } = userParam;
        const hashedPassword = bcrypt.hashSync(password, 10);
        try {
            const oUser: Users = await this.usersRepository.create({
                mail: mail, password: hashedPassword
            });
            await this.usersRepository.save(oUser);
            return oUser;
        } catch (err: any) {
            throw new NotAcceptableException("Cannot create user");
        }
    }

    /**
     * Auth user
     * @param user 
     * @returns {Promise<Record<string, any>>}
     */
    public async login(user: any): Promise<Record<string, any>> {
        // Validation Flag
        let isOk = false;

        // Transform body into DTO
        const userDTO = new UsersDTO();
        userDTO.mail = user.mail;
        userDTO.password = user.password;

        // Validate DTO against validate function from class-validator
        await validate(userDTO).then((errors) => {
            if (!errors.length) {
                isOk = true;
            }
        });

        if (isOk) {
            // Get user information
            const userDetails = await this.usersRepository.findOne({
                where: { mail: user.mail }
            });
            if (userDetails == null) {
                return { status: 401, msg: { msg: 'Invalid credentials' } };
            }

            // Check if the given password match with saved password
            const isValid = bcrypt.compareSync(user.password, userDetails.password);
            if (isValid) {
                return {
                    status: 200,
                    msg: {
                        access_token: this.jwtService.sign({ 
                            id: userDetails.id, 
                            mail: userDetails.mail,
                            uuid: uuid() 
                        }),
                    },
                };
            } else {
                return { status: 401, msg: { msg: 'Invalid credentials' } };
            }
        } else {
            return { status: 400, msg: { msg: 'Invalid fields.' } };
        }
    }

    /**
     * Validate JwtPayload after user auth
     * @param {JwtPayload} payload 
     * @returns {Users}
     * @throws {UnauthorizedException}
     */
    public async validateUser(payload: JwtPayload) {
        let user: Users = await this.usersRepository.findOne({
            where: { id: payload.id }
        });
        if (user) {
            delete user.password;
            return user;
        }
        throw new UnauthorizedException(
            `There isn't any user`,
        );
    }

    /**
     * Get all users
     * @param query 
     * @returns 
     */
    public async getAllUsers(query: PagingDto): Promise<Paginate<Users>> {
        const [result, total] = await this.usersRepository.findAndCount(
            {
                take: query.take ?? 10,
                skip: query.skip ?? 0
            }
        );
        return {
            data: result,
            count: total
        }
    }
}
