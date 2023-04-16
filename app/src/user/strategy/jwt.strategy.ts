import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { secret_key } from 'src/config/configuration'
import { UserService } from '../user.service';
import { Users } from '../entity/user.entity';
import { JwtPayload } from '../dto/jwt.payload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly usersService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            passReqToCallback: false,
            secretOrKey: secret_key
        });
    }

    async validate(payload: JwtPayload): Promise<Users> {
        return await this.usersService.validateUser(payload);
    }
}