import { Document, Schema, model } from "mongoose";

export interface TaskDocument extends Document {
  title: string;
  description: string;
  marked_as_done: boolean;
}

const taskSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    marked_as_done: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

const TaskModel = model<TaskDocument>("Task", taskSchema);
export default TaskModel;
