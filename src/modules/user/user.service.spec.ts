import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from 'src/types';
import { UserService } from './user.service';

const mockUser: User = {
  email: 'email@email.com',
  id: 1,
  name: 'name',
  password: '123456',
  role: Role.USER,
  setPassword: async () => {},
};

const mockUserRepository = {
  find: jest.fn().mockResolvedValue([mockUser]),
  findOneBy: jest.fn().mockResolvedValue(mockUser),
  save: jest.fn().mockResolvedValue(mockUser),
  create: jest.fn(),
  update: jest.fn(),
  findOneByOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockUser),
  findOneOrFail: jest
    .fn()
    .mockResolvedValue({
      id: '',
    })
    .mockResolvedValue(mockUser),
  delete: jest.fn(),
};

describe('service', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to findAll', async () => {
    await expect(service.findAll()).resolves.toEqual([mockUser]);

    expect(mockUserRepository.find).toBeCalled();
  });

  it('should be able to findOne', async () => {
    await expect(service.findOne(mockUser.id)).resolves.toEqual(mockUser);

    expect(mockUserRepository.findOneByOrFail).toBeCalled();
  });
});
