import { Document, Model, model, Schema } from 'mongoose';
import { ITask } from './task';
import { IUser } from './user';

export interface IList extends Document {
  title: string;
  user: IUser;
  tasks: ITask[];
}

const ListSchema = new Schema(
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

//https://xjavascript.com/view/3705349/cascade-style-delete-in-mongoose
//https://dev.to/kwabenberko/implementing-sql--like-cascades-in-mongoose-bap
ListSchema.pre('remove', async function () {
  this.model('Task').deleteMany({ list: this._id });
});

const List: Model<IList> = model('List', ListSchema);

export { List };
