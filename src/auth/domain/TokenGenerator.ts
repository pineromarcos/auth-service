import { UserTokenPayload } from '@core/domain/UserTokenPayload';
import { Token } from '@core/types/Token';

export interface TokenGenerator {
    create(payload: UserTokenPayload): Promise<Token>
}

export const TOKEN_GENERATOR = Symbol.for('TokenGenerator');