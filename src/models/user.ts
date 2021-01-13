import { Document, Model, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  admin: Boolean;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
);

userSchema.pre<IUser>('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this as IUser;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

const User: Model<IUser> = model<IUser>('User', userSchema);

export { User };
