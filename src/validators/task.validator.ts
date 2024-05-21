import { object, string, TypeOf, z } from "zod";
import mongoose from "mongoose";

/**
 * components:
 *   schema:
 *     Task:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - marked_as_done
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         marked_as_done:
 *           type: boolean
 */

const params = {
  params: object({
    id: string().refine((val) => {
      return mongoose.Types.ObjectId.isValid(val);
    }, "Task Id is required"),
  }),
};

const create = {
  body: object({
    title: string({ required_error: "Title is required." }),
    description: string({ required_error: "Description is required." }),
  }),
};

const update = {
  body: object({
    title: string().optional(),
    description: string().optional(),
    marked_as_done: z.coerce.number().default(0),
  }),
};

export const createTaskValidator = object({
  ...create,
});

export const readOneTaskValidator = object({
  ...params,
});

export const updateTaskValidator = object({
  ...params,
  ...update,
});

export const deleteTaskValidator = object({
  ...params,
});

export type CreateTaskInput = TypeOf<typeof createTaskValidator>;
export type ReadOneTaskInput = TypeOf<typeof readOneTaskValidator>;
export type DeleteTaskInput = TypeOf<typeof deleteTaskValidator>;
export type UpdateTaskInput = TypeOf<typeof updateTaskValidator>;
