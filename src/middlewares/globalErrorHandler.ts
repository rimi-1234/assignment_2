import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err.statusCode) {
        statusCode = err.statusCode;
        message = err.message || message;
    } else if (err instanceof Error) {
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errors: err
    });
};

export default globalErrorHandler;
