import { MongooseClientFactory } from '@core/infrastructure/dataSources/MongooseClientFactory';
import { Nullable } from '@core/types/Nullable';
import { User, UserPrimitives } from '@src/auth/domain/User';
import { UserRepository } from '@src/auth/domain/UserRepository';
import { UserMongooseSchema } from '@src/auth/infrastructure/dataSources/mongooseSchema/UserSchema';
import { inject, injectable } from 'inversify';
import { Model } from 'mongoose';

@injectable()

export class UserMongoose implements UserRepository {

  private mongooseClientFactory: MongooseClientFactory;

  public constructor (@inject(MongooseClientFactory) mongooseClientFactory: MongooseClientFactory) {
    this.mongooseClientFactory = mongooseClientFactory;
  }

  public async create (user: User): Promise<void> {
    const userModel = await this.getModel();
    const userPrimitives = user.toPrimitives();
    const model = new userModel({ ...userPrimitives, _id: user.getId(), id: undefined });
    model.save();
  }

  public async findByUsername (username: string): Promise<Nullable<User>> {
    const model = await this.getModel();
    const result = await model.findOne({ username: username }).lean();

    if (!result) {
      return null;
    }
    // eslint-disable-next-line no-underscore-dangle
    const id = result._id.toString();
    const data: UserPrimitives = { ...result, id: id };

    return User.fromPrimitives(data);
  }

  private async getModel (): Promise<Model<UserPrimitives>> {
    const mongoose = await this.mongooseClientFactory.getClient();

    return mongoose.model<UserPrimitives>('User', UserMongooseSchema, 'user');
  }

}
