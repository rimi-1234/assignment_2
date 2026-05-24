import { IssueService } from "./issue.service.js";
import { sendResponse } from "../../utils/response.js";
import { StatusCodes } from "http-status-codes";
const createIssue = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await IssueService.createIssue(req.body, userId);
        sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: "Issue created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getIssues = async (req, res, next) => {
    try {
        const { sort, type, status } = req.query;
        const result = await IssueService.getIssues({
            sort: sort,
            type: type,
            status: status,
        });
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getSingleIssue = async (req, res, next) => {
    try {
        const issueId = parseInt(req.params.id, 10);
        if (isNaN(issueId)) {
            throw new Error("Invalid issue ID");
        }
        const result = await IssueService.getSingleIssue(issueId);
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateIssue = async (req, res, next) => {
    try {
        const issueId = parseInt(req.params.id, 10);
        if (isNaN(issueId)) {
            throw new Error("Invalid issue ID");
        }
        const userId = req.user.id;
        const userRole = req.user.role;
        const result = await IssueService.updateIssue(issueId, req.body, userId, userRole);
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Issue updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const deleteIssue = async (req, res, next) => {
    try {
        const issueId = parseInt(req.params.id, 10);
        if (isNaN(issueId)) {
            throw new Error("Invalid issue ID");
        }
        await IssueService.deleteIssue(issueId);
        sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: "Issue deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
export const IssueController = {
    createIssue,
    getIssues,
    getSingleIssue,
    updateIssue,
    deleteIssue,
};
//# sourceMappingURL=issue.controller.js.map