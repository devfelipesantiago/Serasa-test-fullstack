import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  message: string;
}

export class ResponseHandler {
  static success<T>(res: Response, data: T, message: string = 'Operation completed successfully', statusCode: number = 200): void {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message
    };
    res.status(statusCode).json(response);
  }

  static notFound(res: Response, message: string = 'Record not found'): void {
    const response: ApiResponse = {
      success: true,
      data: null,
      message
    };
    res.status(200).json(response);
  }

  static error(res: Response, message: string, statusCode: number = 400): void {
    const response: ApiResponse = {
      success: false,
      data: null,
      message
    };
    res.status(statusCode).json(response);
  }

  static created<T>(res: Response, data: T, message: string = 'Record created successfully'): void {
    this.success(res, data, message, 201);
  }

  static deleted(res: Response, message: string = 'Record deleted successfully'): void {
    const response: ApiResponse = {
      success: true,
      data: null,
      message
    };
    res.status(200).json(response);
  }
} 