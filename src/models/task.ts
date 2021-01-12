import { Document, Model, model, Schema } from 'mongoose';
import { IList } from './list';

export interface ITask extends Document {
  title: string;
  list: IList;
}

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: 'List',
    },
  },
  { timestamps: true },
);

const Task: Model<ITask> = model('Task', taskSchema);

export { Task };
