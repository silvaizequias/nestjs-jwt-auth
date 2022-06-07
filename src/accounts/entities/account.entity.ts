import { Service } from './../../services/entities/service.entity';
import { User } from './../../users/entities/user.entity';
import { Document } from './../../documents/entities/document.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'accounts' })
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @OneToOne(() => User, user => user.account, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 25,
  })
  first_name: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  last_name: string;

  @OneToMany(() => Document, document => document.account)
  documents: Document[];

  @ManyToMany(() => Service, service => service.accounts)
  @JoinTable()
  services: Service[];

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
