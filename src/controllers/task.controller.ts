import { Request, Response } from "express";
import MessageResponse, { formatResponse } from "../utils/response/Response";
import {
  createTaskValidator,
  deleteTaskValidator,
  readOneTaskValidator,
  updateTaskValidator,
} from "../validators/task.validator";
import {
  CreateTask,
  DeleteTask,
  ReadAllTasks,
  ReadOneTask,
  UpdateTask,
} from "../services/task.service";
import log from "../utils/log/Log";

export default class TaskController {
  private module: "task";
  private message: MessageResponse;

  constructor() {
    this.module = "task";
    this.message = new MessageResponse();
  }

  public async create(req: Request, res: Response): Promise<Response> {
    log.debug("METHOD: CreateTask");
    try {
      const validator = createTaskValidator.parse(req);

      const { title, description } = validator.body;

      const task = await CreateTask({ title, description });
      if (!task)
        return formatResponse(
          res,
          400,
          this.message.create(this.module, true),
          task,
        );

      return formatResponse(res, 200, this.message.create(this.module), task);
    } catch (error) {
      return formatResponse(res, 400, undefined, error);
    }
  }

  public async readOne(req: Request, res: Response): Promise<Response> {
    log.debug("METHOD: ReadOneTask");
    try {
      const validator = readOneTaskValidator.parse(req);

      const { id } = validator.params;

      const task = await ReadOneTask(id);
      if (!task)
        return formatResponse(
          res,
          400,
          this.message.readOne(this.module, true),
          task,
        );

      return formatResponse(res, 200, this.message.readOne(this.module), task);
    } catch (error) {
      return formatResponse(res, 400, undefined, error);
    }
  }

  public async readAll(_req: Request, res: Response): Promise<Response> {
    log.debug("METHOD: ReadAllTasks");
    try {
      const tasks = await ReadAllTasks();
      if (!tasks)
        return formatResponse(
          res,
          400,
          this.message.readAll(this.module, true),
          tasks,
        );

      return formatResponse(res, 200, this.message.readAll(this.module), tasks);
    } catch (error) {
      return formatResponse(res, 400, undefined, error);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    log.debug("METHOD: UpdateTask");
    try {
      const validator = updateTaskValidator.parse(req);

      const { id } = validator.params;
      const { title, description, marked_as_done: marked } = validator.body;

      const task = await ReadOneTask(id);
      if (!task)
        return formatResponse(
          res,
          400,
          this.message.readOne(this.module, true),
          task,
        );

      const marked_as_done = marked === 1;

      const update = await UpdateTask(id, {
        title,
        description,
        marked_as_done,
      });
      if (!update)
        return formatResponse(
          res,
          400,
          this.message.update(this.module, true),
          task,
        );

      return formatResponse(res, 200, this.message.update(this.module), update);
    } catch (error) {
      return formatResponse(res, 400, undefined, error);
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    log.debug("METHOD: DeleteTask");
    try {
      const validator = deleteTaskValidator.parse(req);

      const { id } = validator.params;

      const task = await ReadOneTask(id);
      if (!task)
        return formatResponse(
          res,
          400,
          this.message.readOne(this.module, true),
          task,
        );

      const drop = await DeleteTask(id);
      if (!drop)
        return formatResponse(
          res,
          400,
          this.message.delete(this.module, true),
          task,
        );

      return formatResponse(res, 200, this.message.delete(this.module), task);
    } catch (error) {
      return formatResponse(res, 400, undefined, error);
    }
  }
}
