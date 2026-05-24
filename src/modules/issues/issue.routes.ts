import express from "express";
import { IssueController } from "./issue.controller.js";
import { authVerify, role } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Contributors & Maintainers can create issues (authenticated)
router.post("/", authVerify, role(["contributor", "maintainer"]), IssueController.createIssue);

// Public routes (no auth required)
router.get("/", IssueController.getIssues);
router.get("/:id", IssueController.getSingleIssue);

// Authed users can update issues (permissions checked inside Service layer)
router.patch("/:id", authVerify, role(["contributor", "maintainer"]), IssueController.updateIssue);

// Only Maintainers can delete issues
router.delete("/:id", authVerify, role(["maintainer"]), IssueController.deleteIssue);

export default router;
