import { UsersEntity } from './entities/users.entity';
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  FindConditions,
  FindOneOptions,
  Repository,
} from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  create(
    createUserDto: CreateUserDto,
  ): Promise<UsersEntity> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<UsersEntity[]> {
    return await this.userRepository.find({
      select: ['id', 'username', 'is_active'],
    });
  }

  async findOne(id: string): Promise<UsersEntity> {
    return await this.userRepository.findOne(id);
  }

  async findOneOurFail(
    conditions: FindConditions<UsersEntity>,
    options?: FindOneOptions<UsersEntity>,
  ) {
    try {
      return await this.userRepository.findOneOrFail(
        conditions,
        options,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UsersEntity> {
    const user = await this.findOneOurFail({ id });
    await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    await this.userRepository.findOneOrFail({ id });
    this.userRepository.softRemove({ id });
  }
}
