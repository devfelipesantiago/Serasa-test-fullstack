import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../utils/responseHandler.utils";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error!';

  return ResponseHandler.error(res, message, status);
}