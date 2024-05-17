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

@Controller('book')
@UseGuards(PermissionGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

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

  @Patch(':bookId')
  @RequiredPermissions(Role.ADMIN)
  update(
    @Param('bookId') bookId: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.bookService.update(bookId, updateBookDto);
  }

  @Delete(':bookId')
  @RequiredPermissions(Role.ADMIN)
  remove(@Param('bookId') bookId: number) {
    return this.bookService.remove(bookId);
  }
}
