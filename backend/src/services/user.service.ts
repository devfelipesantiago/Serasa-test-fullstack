import { User, UserRole } from '../model/entities/user.entity';
import { IUserRepository } from '../model/repositories/interfaces/user.interfaces';
import { UserRepository } from '../model/repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import bcrypt from 'bcryptjs';

export class UserService {
  private repo: IUserRepository;

  constructor(repo?: IUserRepository) {
    this.repo = repo || new UserRepository();
  }

  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.repo.create({
      ...data,
      password: hashedPassword,
    });
    return user;
  }

  async findById(id: number): Promise<User | null> {
    return this.repo.findById(id);
  }

  async findAll(page = 1, limit = 10, role?: UserRole) {
    return this.repo.findAll(page, limit, role);
  }

  async update(id: number, data: UpdateUserDto): Promise<User | null> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findByEmail(email);
  }
}
