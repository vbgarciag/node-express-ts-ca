import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../../../core/shared/domain/exceptions/CustomError';

function errorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
  let status = 500;
  let message: string = error.message || 'Something went wrong';
  if (error instanceof CustomError) {
    status = error.statusCode;
    message = error.message || 'Something went wrong';
  }
  response.status(status).json({
    error: message
  });
}
export default errorMiddleware;