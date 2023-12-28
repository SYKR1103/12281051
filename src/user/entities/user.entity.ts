import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { PostEntity } from '../../post/entities/post.entity';
import * as bcrypt from 'bcryptjs';
import { ProviderEnum } from './provider.enum';
import { InternalServerErrorException } from '@nestjs/common';

@Entity()
export class User extends BaseEntity {
  @Column()
  public nickname: string;

  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  public password: string;

  @Column({
    type: 'enum',
    enum: ProviderEnum,
    default: ProviderEnum.Local,
  })
  public provider: ProviderEnum;
  @BeforeInsert()
  async hashpassword() {
    try {
      if (this.provider === 'local') {
        const saltValue = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, saltValue);
      }
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string) {
    try {
      const isMatched = await bcrypt.compare(aPassword, this.password);
      return isMatched;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  @OneToMany(() => PostEntity, (post: PostEntity) => post.author)
  public posts?: PostEntity[];
}
