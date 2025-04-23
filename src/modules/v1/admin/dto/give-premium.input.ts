import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class GivePremiumQueryDto {
    @Type(() => Number)
    @IsInt({ message: 'days must be an integer' })
    @Min(1, { message: 'days must be more than 0' })
    @Max(30, { message: 'days must be less than or equal to 30' })
    days: number;
}

export class IdParamDto {
    @Type(() => Number)
    @IsInt({ message: 'id must be an integer' })
    @Min(1, { message: 'id must be greater than 0' })
    id: number;
}
