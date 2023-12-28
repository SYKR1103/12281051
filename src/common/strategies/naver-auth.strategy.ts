import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { ProviderEnum } from '../../user/entities/provider.enum';
import { UserService } from '../../user/user.service';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class NaverAuthStrategy extends PassportStrategy(
  Strategy,
  ProviderEnum.Naver,
) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get('NAVER_AUTH_CLIENTID'),
      clientSecret: configService.get('NAVER_AUTH_CLIENT_SECRET'),
      callbackURL: configService.get('NAVER_AUTH_CALLBACK_URL'),
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: any,
  ) {
    const { email, nickname } = profile._json;
    const { provider } = profile;

    try {
      const user = await this.userService.findUserByEmail(email);
      if (user.provider !== provider) {
        throw new HttpException('XX', HttpStatus.CONFLICT);
      }
      done(null, user);
    } catch (e) {
      console.log(e.status, e.statusCode);

      if (e.status === 404) {
        const newuser = await this.userService.createUser({
          email,
          nickname,
          provider: ProviderEnum.Naver,
        });
        console.log(newuser);
        done(null, newuser);
      }
    }
  }
}
