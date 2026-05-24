import type { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service.js";
import { sendResponse } from "../../utils/response.js";
import { StatusCodes } from "http-status-codes";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.registerUser(req.body);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.loginUser(req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const AuthController = {
  signup,
  login,
};
