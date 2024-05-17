import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import { IsOptional } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({
    required: false,
    type: 'string',
    example: 'Buku Kimia',
    description: 'create book',
  })
  @IsOptional()
  title?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    example: 'Buku Kimia',
    description: 'create book',
  })
  @IsOptional()
  author?: string;
}
