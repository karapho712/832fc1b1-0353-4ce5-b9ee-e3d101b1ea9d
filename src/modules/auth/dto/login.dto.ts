import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    required: true,
    type: 'string',
    example: 'for admin role: admin@gmail.com, password: 1234567890',
    description: 'for user: elizabethneumann915@planet.biz, password: 123456',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    type: 'string',
    example: 'for admin role: admin@gmail.com, password: 1234567890',
    description: 'for user: elizabethneumann915@planet.biz, password: 123456',
  })
  @IsString()
  password: string;
}
