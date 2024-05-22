import { Document, Schema, model } from "mongoose";

export interface TaskDocument extends Document {
  user: string;
  title: string;
  description: string;
  flag: string;
  marked_as_done: boolean;
}

const taskSchema = new Schema(
  {
    user: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    flag: {
      type: String,
      enum: ["urgent", "priority", "normal"],
      default: "normal",
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

taskSchema.index({ user: 1 });

const TaskModel = model<TaskDocument>("Task", taskSchema);
export default TaskModel;
