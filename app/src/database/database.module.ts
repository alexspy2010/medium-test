import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
              type: 'sqlite',
              database: "medium.db",
              entities: [],
              autoLoadEntities: true,
              logging:false
            }),
        }),
      ]
})
export class DatabaseModule {}
