import { ROLES } from '@src/auth/domain/Roles';

export interface UserTokenPayload {
    sub: string
    role: ROLES
    username: string
}