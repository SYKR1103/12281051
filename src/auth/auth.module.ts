import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthStrategy } from '../common/strategies/local-auth.strategy';
import { JwtAuthStrategy } from '../common/strategies/jwt-auth.strategy';
import { RedisModule } from '../redis/redis.module';
import { EmailModule } from '../email/email.module';
import { NaverAuthStrategy } from '../common/strategies/naver-auth.strategy';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.register({}),
    RedisModule,
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalAuthStrategy,
    JwtAuthStrategy,
    NaverAuthStrategy,
  ],
})
export class AuthModule {}
