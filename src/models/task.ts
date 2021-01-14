import { Document, Model, model, Schema } from 'mongoose';
import { IList } from './list';
import { IUser } from './user';

import * as connections from '../database/index';

/**
 * @export
 * @interface ITask
 * @extends {Document}
 */
export interface ITask extends Document {
  title: String;
  status: String;
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
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const Task = connections.db.model('Task', TaskSchema);
