import { randUser } from '@ngneat/falso';
import { User } from 'src/modules/user/entities/user.entity';
import { define } from 'typeorm-seeding';

define(User, () => {
  const user = new User();

  const userExample = randUser();

  user.email = userExample.email;
  user.name = userExample.firstName;
  user.password = '123456';

  return user;
});
