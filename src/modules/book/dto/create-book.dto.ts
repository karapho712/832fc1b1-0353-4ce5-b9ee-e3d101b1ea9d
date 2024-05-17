import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    required: true,
    type: 'string',
    example: 'Buku Kimia',
    description: 'create book',
  })
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'Majesti Pratama',
    description: 'create book',
  })
  @IsString()
  author: string;
}
