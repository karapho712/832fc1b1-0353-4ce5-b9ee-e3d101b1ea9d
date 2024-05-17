import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = await this.bookRepository.save(
      this.bookRepository.create({
        ...createBookDto,
      }),
    );

    return book;
  }

  findAll() {
    return this.bookRepository.find();
  }

  findOne(bookId: number) {
    return this.bookRepository.findOneByOrFail({ id: bookId }).catch(() => {
      throw new NotFoundException('Book not found');
    });
  }

  async update(bookId: number, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(bookId);

    return await this.bookRepository.save(
      this.bookRepository.create({
        ...book,
        ...updateBookDto,
      }),
    );
  }

  async remove(bookId: number) {
    const book = await this.findOne(bookId);

    await this.bookRepository.delete(bookId);

    return book;
  }
}
