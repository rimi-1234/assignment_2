import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { AppError } from "../utils/AppError.js";
import { StatusCodes } from "http-status-codes";

export const authVerify = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Missing authorization header");
    }

    // Handle cases where the 'Bearer ' prefix might be missing
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid token format");
    }

    const decoded = jwt.verify(token, config.jwt_secret as string) as jwt.JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized access"));
  }
};

export const role = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Unauthorized access");
      }

      if (!roles.includes(user.role)) {
        throw new AppError(StatusCodes.FORBIDDEN, "Forbidden access");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
