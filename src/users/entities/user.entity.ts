import {
  BaseEntity,
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

  @Column({ name: 'username', type: 'varchar', length: 15 })
  @Unique(['username'])
  username: string;

  @Column({ name: 'is_active', type: Boolean })
  is_active: boolean;

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
}
