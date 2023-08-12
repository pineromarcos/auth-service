export interface Encrypter {
    compare(plainPassword: string, hashedPassword: string): Promise<boolean>
    encrypt(plainPassword: string): Promise<string>
}

export const ENCRYPTER = Symbol.for('Encrypter');