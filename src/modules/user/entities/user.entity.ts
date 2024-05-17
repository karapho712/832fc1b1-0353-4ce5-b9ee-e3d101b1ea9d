import { hash } from 'bcrypt';
import { Role } from 'src/types';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @BeforeInsert()
  @BeforeUpdate()
  async setPassword(password: string) {
    this.password = await hash(password || this.password, 10);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ default: Role.USER })
  role: Role;

  @Column({ select: false })
  password: string;
}
