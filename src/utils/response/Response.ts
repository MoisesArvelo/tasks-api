import { Response } from "express";
import { HttpCodeTypes } from "../http/http_code";
import { ResponseInterface } from "../../interfaces/response.interface";
import { ZodError } from "zod";
import capitalize from "capitalize";
import pluralize from "pluralize";

export const formatResponse = (
  res: Response,
  status_code: HttpCodeTypes,
  message?: string,
  payload?: any,
  code?: number,
): Response => {
  const format: ResponseInterface = {
    success: !(
      status_code === 400 ||
      status_code === 401 ||
      status_code === 404
    ),
  };
  if (payload instanceof ZodError) {
    format.message = payload.issues.map((el) => el.message)[0];
  } else {
    if (message) {
      format.message = message;
    }
    if (typeof payload !== "string") {
      format.payload = payload;
    } else {
      format.message = payload;
    }
  }
  if (code) {
    format.code = code;
  }
  return res.status(status_code).json(format);
};

export default class MessageResponse {
  public create(mod: ModuleType, error?: boolean) {
    return error
      ? `${capitalize(mod)} was not created.`
      : `${capitalize(mod)} was created successfully.`;
  }
  public readOne(mod: ModuleType, error?: boolean) {
    return error
      ? `${capitalize(mod)} was not found.`
      : `${capitalize(mod)} was found successfully.`;
  }
  public readAll(mod: ModuleType, error?: boolean) {
    return error
      ? `${capitalize(pluralize(mod))} were not found.`
      : `${capitalize(pluralize(mod))} were found successfully.`;
  }
  public update(mod: ModuleType, error?: boolean) {
    return error
      ? `${capitalize(mod)} was not updated.`
      : `${capitalize(mod)} was updated successfully.`;
  }
  public delete(mod: ModuleType, error?: boolean) {
    return error
      ? `${capitalize(mod)} was not deleted.`
      : `${capitalize(mod)} was deleted successfully.`;
  }
}
