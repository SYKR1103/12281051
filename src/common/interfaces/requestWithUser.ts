import { User } from '../../user/entities/user.entity';

export interface RequestWithUser {
  user: User;
}
