import { Account } from './../../accounts/entities/account.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Account, account => account.user)
  account: Account;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 12,
  })
  @Unique(['username'])
  username: string;

  @Column({
    name: 'is_active',
    type: Boolean,
    default: false,
  })
  is_active: boolean;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
  })
  password: string;

  @Column({
    name: 'pass_token',
    type: 'varchar',
    length: 12,
  })
  pass_token: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updated_at: Date;

  @BeforeInsert()
  generatorPassAndToken() {
    this.pass_token = Math.random()
      .toString(16)
      .substr(2, 8)
      .toUpperCase();

    this.password = hashSync(this.password, 10);
  }

  @BeforeUpdate()
  passTokenUpdateGenerator() {
    if (this.is_active == false) {
      this.pass_token = Math.random()
        .toString(16)
        .substr(2, 8)
        .toUpperCase();
    }
    return this.pass_token;
  }
}
