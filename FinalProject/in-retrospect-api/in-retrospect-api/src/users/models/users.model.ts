import { model, Schema, Document } from 'mongoose';
import { User } from '../users.interface';

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = model<User & Document>('User', UserSchema);
