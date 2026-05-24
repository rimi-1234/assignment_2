import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 5000,
  connection_string: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET || "supersecretkey",
  jwt_expires_in: process.env.JWT_EXPIRES_IN || "1d",
};
