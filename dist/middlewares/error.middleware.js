import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/AppError.js";
export const errorHandler = (err, req, res, next) => {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = "Something went wrong";
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errors: err,
    });
};
//# sourceMappingURL=error.middleware.js.map