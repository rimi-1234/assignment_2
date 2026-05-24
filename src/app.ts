import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import issueRoutes from "./modules/issues/issue.routes.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

// Error Middleware

app.use(globalErrorHandler);

export default app;
