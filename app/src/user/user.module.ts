import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { secret_key } from 'src/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/user.entity';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([Users]),
        JwtModule.register({
            secret: secret_key,
            signOptions: {
                expiresIn: '43200s',
                algorithm: 'HS384',
            },
            verifyOptions: {
                algorithms: ['HS384'],
            },
        }),
    ],
    controllers: [UserController],
    exports: [UserService, PassportModule],
    providers: [UserService, JwtStrategy]
})
export class UserModule { }
