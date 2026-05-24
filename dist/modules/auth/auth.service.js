import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import { pool } from "../../db/index.js";
import { AppError } from "../../utils/AppError.js";
import { StatusCodes } from "http-status-codes";
const registerUser = async (payload) => {
    const { name, email, password, role } = payload;
    if (!password) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Password is required");
    }
    // check if user exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
        throw new AppError(StatusCodes.CONFLICT, "User with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || "contributor";
    const result = await pool.query("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *", [name, email, hashedPassword, userRole]);
    const user = result.rows[0];
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
};
const loginUser = async (payload) => {
    const { email, password } = payload;
    if (!password) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Password is required");
    }
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
    }
    const jwtPayload = {
        id: user.id,
        name: user.name,
        role: user.role,
    };
    const token = jwt.sign(jwtPayload, config.jwt_secret, {
        expiresIn: config.jwt_expires_in,
    });
    const { password: _, ...userWithoutPassword } = user;
    return {
        token,
        user: userWithoutPassword,
    };
};
export const AuthService = {
    registerUser,
    loginUser,
};
//# sourceMappingURL=auth.service.js.map