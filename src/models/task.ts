import { model, Schema, Model, Document } from 'mongoose';
import { IList } from './list';
import { IUser } from './user';

import * as connections from '../database/index';

/**
 * @export
 * @interface ITask
 * @extends {Document}
 */
export interface ITask extends Document {
  title: string;
  status: string;
  list: IList;
  user: IUser;
}

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: 'List',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const Task: Model<ITask> = model('Task', TaskSchema);

export { Task };
