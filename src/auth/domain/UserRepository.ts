import { Nullable } from '@core/types/Nullable';
import { User } from '@src/auth/domain/User';

export interface UserRepository {
    findByUsername(username: string): Promise<Nullable<User>>
    create(user: User): Promise<void>
}

export const USER_REPOSITORY = Symbol.for('UserRepository');