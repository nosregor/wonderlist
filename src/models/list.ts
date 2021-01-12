import { Document, Model, model, Schema } from 'mongoose';
import { IUser } from './user';

export interface IList extends Document {
  title: string;
  description: string;
  user: IUser;
}

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const List: Model<IList> = model('List', listSchema);

export { List };
