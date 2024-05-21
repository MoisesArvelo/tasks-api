import mongoose, {
  FilterQuery,
  PopulateOptions,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import TaskModel, { TaskDocument } from "../models/task.model";
import { TaskInterface } from "../interfaces/task.interface";
import log from "../utils/log/Log";

export const CreateTask = async (
  data: TaskInterface,
): Promise<TaskDocument | null> => {
  try {
    const result = new TaskModel(data);
    await result.save();
    log.debug(`result: ${result}`);
    return result;
  } catch (error) {
    throw error;
  }
};

export const ReadOneTask = async (id: string): Promise<TaskDocument | null> => {
  const _id = new mongoose.Types.ObjectId(id);
  try {
    const result = await TaskModel.findById(_id)
      .select({ __v: 0, created_at: 0, updated_at: 0, is_delete: 0 })
      .exec();
    log.debug(`result: ${result}`);
    return result;
  } catch (error) {
    throw error;
  }
};

export const ReadAllTasks = async (): Promise<TaskDocument[]> => {
  try {
    const result = await TaskModel.find()
      .select({ __v: 0, created_at: 0, updated_at: 0, is_delete: 0 })
      .exec();
    log.debug(`result: ${result}`);
    return result;
  } catch (error) {
    throw error;
  }
};

export const ReadOneTaskWithQuery = async (
  query: FilterQuery<TaskDocument>,
  populate: PopulateOptions[] = [],
): Promise<TaskDocument | null> => {
  try {
    const result = await TaskModel.findOne(query)
      .select({ __v: 0, created_at: 0, updated_at: 0, is_delete: 0 })
      .populate(populate)
      .exec();
    log.debug(`result: ${result}`);
    return result;
  } catch (error) {
    throw error;
  }
};

export const ReadAllTasksWithQuery = async (
  query: FilterQuery<TaskDocument>,
): Promise<TaskDocument[]> => {
  try {
    const result = await TaskModel.find(query)
      .select({ __v: 0, created_at: 0, updated_at: 0, is_delete: 0 })
      .exec();
    log.debug(`result: ${result}`);
    return result;
  } catch (error) {
    throw error;
  }
};

export const UpdateTask = async (
  id: string,
  data: TaskInterface,
): Promise<TaskDocument | null> => {
  const _id = new mongoose.Types.ObjectId(id);
  try {
    const query: FilterQuery<TaskDocument> = { _id };
    const update: UpdateQuery<TaskInterface> = data;
    const options: QueryOptions = { new: true };
    const result = await TaskModel.findOneAndUpdate(query, update, options)
      .select({ __v: 0, created_at: 0, updated_at: 0, is_delete: 0 })
      .exec();

    log.debug(`result: ${result}`);
    return result;
  } catch (error) {
    throw error;
  }
};

export const DeleteTask = async (id: string): Promise<TaskDocument | null> => {
  const _id = new mongoose.Types.ObjectId(id);
  try {
    const query: FilterQuery<TaskDocument> = { _id };
    const result = await TaskModel.findOneAndDelete(query).exec();
    log.debug(`result: ${result}`);
    return result;
  } catch (error) {
    throw error;
  }
};
