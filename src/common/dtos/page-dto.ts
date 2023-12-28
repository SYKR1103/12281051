import { ApiProperty } from '@nestjs/swagger';
import { PageMegaDto } from './page-mega.dto';

export class PageDto<T> {
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: PageMegaDto })
  readonly mega: any;

  constructor(data: T[], mega: PageMegaDto) {
    this.data = data;
    this.mega = mega;
  }
}
