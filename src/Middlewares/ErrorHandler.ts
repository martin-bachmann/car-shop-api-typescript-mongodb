import { NextFunction, Request, Response } from 'express';
import ExpressError from '../utils/ExpressError';

class ErrorHandler {
  public static handle(
    error: ExpressError,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    res.status(error.status || 500).json({ message: error.message });
    next();
  }
}

export default ErrorHandler;