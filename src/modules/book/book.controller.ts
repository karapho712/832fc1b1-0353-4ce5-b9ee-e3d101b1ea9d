import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Role } from 'src/types';
import { RequiredPermissions } from 'src/utils/required-permissions.decorator';
import { PermissionGuard } from '../auth/guard/permission.guard';
import { Public } from 'src/utils/public.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('book')
@ApiBearerAuth('user-access-token')
@Controller('book')
@UseGuards(PermissionGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({
    summary: 'create book',
    description: 'To create book, need login as admin role',
  })
  @Post()
  @RequiredPermissions(Role.ADMIN)
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':bookId')
  @Public()
  findOne(@Param('bookId') bookId: number) {
    return this.bookService.findOne(bookId);
  }

  @ApiOperation({
    summary: 'update book',
    description: 'To update book, need login as admin role',
  })
  @Patch(':bookId')
  @RequiredPermissions(Role.ADMIN)
  update(
    @Param('bookId') bookId: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.bookService.update(bookId, updateBookDto);
  }

  @ApiOperation({
    summary: 'delete book',
    description: 'To delete book, need login as admin role',
  })
  @Delete(':bookId')
  @RequiredPermissions(Role.ADMIN)
  remove(@Param('bookId') bookId: number) {
    return this.bookService.remove(bookId);
  }
}
