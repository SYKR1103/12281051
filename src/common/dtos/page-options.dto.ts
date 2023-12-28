import { OrderConstraint } from '../constraints/order.constraint';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PageOptionDto {
  @ApiPropertyOptional({ enum: OrderConstraint, default: OrderConstraint.ASC })
  @IsEnum(OrderConstraint)
  @IsOptional()
  order?: OrderConstraint = OrderConstraint.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 10,
    maximum: 50,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly take?: number = 10;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  readonly page?: number = 1;

  get skil(): number {
    return (this.page - 1) * this.take;
  }
}
