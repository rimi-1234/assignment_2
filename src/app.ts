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

// Landing Page Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the DevPulse Issue Tracker API!",
    data: {
      project: "Assignment 2",
      description: "A secure, role-based issue tracking system",
      endpoints: {
        auth: "/api/auth",
        issues: "/api/issues"
      },
      repository: "https://github.com/rimi-1234/assignment_2",
      author: "rimi-1234"
    }
  });
});

// Error Middleware

app.use(globalErrorHandler);

export default app;
