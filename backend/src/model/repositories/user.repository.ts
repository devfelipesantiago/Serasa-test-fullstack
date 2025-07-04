import { User, UserRole } from '../entities/user.entity';
import { IUserRepository } from './interfaces/user.interfaces';
import { AppDataSource } from '../database/config';

export class UserRepository implements IUserRepository {
  private repo = AppDataSource.getRepository(User);

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.repo.create(user);
    return this.repo.save(newUser);
  }

  async findById(id: number): Promise<User | null> {
    return this.repo.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOneBy({ email });
  }

  async findAll(page = 1, limit = 10, role?: UserRole): Promise<{ data: User[]; total: number }> {
    const skip = (page - 1) * limit;
    const where = role ? { role } : {};
    const [data, total] = await this.repo.findAndCount({ where, skip, take: limit });
    return { data, total };
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    await this.repo.update(id, user);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
