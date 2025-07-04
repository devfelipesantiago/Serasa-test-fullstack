import { User, UserRole } from '../../entities/user.entity';

export interface IUserRepository {
  create(user: Partial<User>): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(page?: number, limit?: number, role?: UserRole): Promise<{ data: User[]; total: number }>;
  update(id: number, user: Partial<User>): Promise<User | null>;
  delete(id: number): Promise<void>;
}
