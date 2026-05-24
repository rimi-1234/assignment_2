import express from "express";
import { IssueController } from "./issue.controller.js";
import { authVerify, role } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authVerify, role(["contributor", "maintainer"]), IssueController.createIssue);
router.get("/", IssueController.getIssues);
router.get("/:id", IssueController.getSingleIssue);
router.patch("/:id", authVerify, role(["contributor", "maintainer"]), IssueController.updateIssue);
router.delete("/:id", authVerify, role(["maintainer"]), IssueController.deleteIssue);

export default router;
