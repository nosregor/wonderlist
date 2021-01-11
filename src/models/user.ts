import { NextFunction } from 'express';
import { Document, Model, model, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    email: login,
  });

  if (!user) {
    user = await this.findOne({ email: login });
  }

  return user;
};

const User: Model<IUser> = model('User', userSchema);

export { User };
