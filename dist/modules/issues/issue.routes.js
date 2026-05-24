import express from "express";
import { IssueController } from "./issue.controller.js";
import { requireAuth, requireRole } from "../../middlewares/auth.middleware.js";
const router = express.Router();
// Contributors & Maintainers can create issues (authenticated)
router.post("/", requireAuth, requireRole(["contributor", "maintainer"]), IssueController.createIssue);
// Public routes (no auth required)
router.get("/", IssueController.getIssues);
router.get("/:id", IssueController.getSingleIssue);
// Authed users can update issues (permissions checked inside Service layer)
router.patch("/:id", requireAuth, requireRole(["contributor", "maintainer"]), IssueController.updateIssue);
// Only Maintainers can delete issues
router.delete("/:id", requireAuth, requireRole(["maintainer"]), IssueController.deleteIssue);
export default router;
//# sourceMappingURL=issue.routes.js.map