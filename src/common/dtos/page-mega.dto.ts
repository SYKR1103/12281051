import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameter } from '../interfaces/page-meta-dto-parameter';

export class PageMegaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasNext: boolean;

  @ApiProperty()
  readonly hasPrevious: boolean;

  constructor({ pageOptionDto, itemCount }: PageMetaDtoParameter) {
    this.page = pageOptionDto.page;
    this.take = pageOptionDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPrevious = this.page > 1;
    this.hasNext = this.page < this.pageCount;
  }
}
