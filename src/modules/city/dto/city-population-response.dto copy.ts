import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CityPopulationResponseDTO {
  @ApiProperty({
    description: 'População do município',
    example: 123456,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  cityPopulation: number;
}
