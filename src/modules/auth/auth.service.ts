import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import { pool } from "../../db/index.js";
import { AppError } from "../../utils/AppError.js";
import { StatusCodes } from "http-status-codes";
import type {
  IRegisterPayload,
  ILoginPayload,
  IUserRes,
} from "./auth.interface.js";

const registerUser = async (
  payload: IRegisterPayload
): Promise<IUserRes> => {
  const { name, email, password, role } = payload;

  if (!password) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Password is required");
  }

  const existUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (existUser.rows.length > 0) {
    throw new AppError(StatusCodes.CONFLICT, "User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userRole = role || "contributor";

  const result = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, hashedPassword, userRole]
  );

  const user = result.rows[0];
  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword as IUserRes;
};

const loginUser = async (
  payload: ILoginPayload
): Promise<{ token: string; user: IUserRes }> => {
  const { email, password } = payload;

  if (!password) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Password is required");
  }

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }
  const userData = await bcrypt.compare(password, user.password);
  if (!userData) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: config.jwt_expires_in as any,
  });

  const { password: _, ...userWithoutPassword } = user;

  return {
    token,
    user: userWithoutPassword as IUserRes,
  };
};

export const AuthService = {
  registerUser,
  loginUser,
};
