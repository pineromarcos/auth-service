import { Schema } from 'mongoose';

export const UserMongooseSchema = new Schema({
  _id: String,
  created_at: Date,
  username: String,
  password: String,
  role: String
});
