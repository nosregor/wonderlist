import { Document, Model, model, Schema } from 'mongoose';
import { ITask } from './task';
import { IUser } from './user';

export interface IList extends Document {
  title: string;
  user: IUser;
  tasks: ITask[];
}

const listSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  { timestamps: true },
);

const List: Model<IList> = model('List', listSchema);

export { List };
