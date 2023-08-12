import { ROLES } from '@src/auth/domain/Roles';

export interface UserPrimitives {
  username: string
  password: string
  role: string
  id: string
}

export interface UserDataConstructor extends Omit<UserPrimitives, 'role'> {
  role: ROLES;
}

export class User {

  private username: string;
  private password: string;
  private role: ROLES;
  private id: string;

  public constructor (data: UserDataConstructor) {
    this.username = data.username;
    this.password = data.password;
    this.role = data.role;
    this.id = data.id;
  }

  public getId (): string {
    return this.id;
  }

  public getUsername (): string {
    return this.username;
  }

  public getPassword (): string {
    return this.password;
  }

  public getRole (): ROLES {
    return this.role;
  }

  public static fromPrimitives (userPrimitives: UserPrimitives): User {
    const user: UserDataConstructor = {
      ...userPrimitives,
      role: userPrimitives.role as ROLES
    };

    return new User(user);
  }

  public toPrimitives (): UserPrimitives {
    return {
      id: this.id,
      role: this.role,
      username: this.username,
      password: this.password
    };
  }

}
