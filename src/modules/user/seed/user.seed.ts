import { Seeder, Factory } from 'typeorm-seeding';
import { User } from 'src/modules/user/entities/user.entity';
import { Role } from 'src/types';

export class UserCreateSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().create({
      email: 'admin@gmail.com',
      name: 'alief',
      password: '1234567890',
      role: Role.ADMIN,
    });

    await factory(User)().createMany(3);
  }
}
