import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'username',
    type: 'varchar',
    length: 12,
  })
  @Unique(['username'])
  username: string;

  @Column({ name: 'is_active', type: Boolean })
  is_active: boolean;

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
  passTokenGenerator() {
    this.pass_token = Math.random()
      .toString(16)
      .substr(2, 8)
      .toUpperCase();
  }
}
