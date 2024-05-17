import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class BookService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    this.logger.debug(`BookService.create(${JSON.stringify(createBookDto)})`);
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
    this.logger.debug(
      `BookService.update(${JSON.stringify(book)} , ${JSON.stringify(updateBookDto)})`,
    );

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

    this.logger.debug(`BookService.delete(${JSON.stringify(book)})`);

    return book;
  }
}
