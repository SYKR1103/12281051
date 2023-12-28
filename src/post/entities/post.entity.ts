import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class PostEntity extends BaseEntity {
  @Column()
  public title: string;

  @Column()
  public desc: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;
}
