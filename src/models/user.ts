import { Document, Model, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import * as connections from '../database/index';

/**
 * @export
 * @interface IUser
 * @extends {Document}
 */
export interface IUser extends Document {
  // porperties
  username: string;
  email: string;
  password: string;
  admin: Boolean;
  // methods
  getFullGender(): (passpword: string) => Promise<boolean>;
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      default: '',
      index: true,
    },
    email: {
      type: String,
      required: [true, "can't be blank"],
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
).pre('save', async function (next): Promise<void> {
  // tslint:disable-line
  const user: any = this;
  console.log(this);
  try {
    const salt: string = await bcrypt.genSalt(10);

    const hash: string = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Method for comparing passwords
 */
UserSchema.methods.isValidPassword = async function (
  userPassword: string,
): Promise<Boolean> {
  try {
    const user: any = this;

    const compare: boolean = await bcrypt.compare(
      userPassword,
      user.password,
    );
    return compare;
  } catch (error) {
    return error;
  }
};

export const User = connections.db.model('User', UserSchema);
