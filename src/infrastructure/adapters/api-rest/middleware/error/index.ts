import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../../../../domain/exceptions/CustomError';

function errorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
  let status = 500;
  let message: string = error.message || 'Something went wrong';
  if (error instanceof CustomError) {
    status = error.statusCode;
    message = error.message || 'Something went wrong';
  }
  response.status(status).json({
    message
  });
}
export default errorMiddleware;