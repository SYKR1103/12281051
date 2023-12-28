import { ProviderEnum } from '../entities/provider.enum';

export class CreateUserDto {
  email: string;
  password?: string;
  nickname: string;
  provider: ProviderEnum;
}
