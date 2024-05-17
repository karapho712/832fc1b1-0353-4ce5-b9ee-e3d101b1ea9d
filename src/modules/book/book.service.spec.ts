import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

const mockBook: Book = {
  id: 1,
  author: 'author',
  title: 'title',
};

const mockBookRepository = {
  find: jest.fn().mockResolvedValue([mockBook]),
  findOneBy: jest.fn().mockResolvedValue(mockBook),
  save: jest.fn().mockResolvedValue(mockBook),
  create: jest.fn(),
  update: jest.fn(),
  findOneByOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockBook),
  findOneOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockBook),
  delete: jest.fn(),
};

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: {
            debug: jest.fn().mockResolvedValue(''),
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to findAll', async () => {
    await expect(service.findAll()).resolves.toEqual([mockBook]);

    expect(mockBookRepository.find).toBeCalled();
  });

  it('should be able to findOne', async () => {
    await expect(service.findOne(mockBook.id)).resolves.toEqual(mockBook);

    expect(mockBookRepository.findOneByOrFail).toBeCalled();
  });

  it('should be able to create', async () => {
    await expect(service.create(mockBook)).resolves.toEqual(mockBook);

    expect(mockBookRepository.save).toBeCalled();
    expect(mockBookRepository.create).toBeCalled();
  });

  it('should be able to update', async () => {
    await expect(service.update(mockBook.id, mockBook)).resolves.toEqual(
      mockBook,
    );

    expect(mockBookRepository.save).toBeCalled();
    expect(mockBookRepository.create).toBeCalled();
  });

  it('should be able to delete', async () => {
    await expect(service.remove(mockBook.id)).resolves.toEqual(mockBook);

    expect(mockBookRepository.delete).toBeCalled();
  });
});
