import { Token } from '@core/types/Token';
import { UserTokenPayload } from '@core/domain/UserTokenPayload';

export interface TokenVerifier {
    verify(token: Token): Promise<UserTokenPayload>
}

export const TOKEN_VERIFIER = Symbol.for('TokenVerifier');