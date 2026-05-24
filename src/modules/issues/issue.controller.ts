import type { Request, Response, NextFunction } from "express";
import { IssueService } from "./issue.service.js";
import { sendResponse } from "../../utils/response.js";
import { StatusCodes } from "http-status-codes";

const createIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const result = await IssueService.createIssue(req.body, userId);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getIssues = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sort, type, status } = req.query;
    const result = await IssueService.getIssues({
      sort: sort as string,
      type: type as string,
      status: status as string,
    });

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const issueId = parseInt(req.params.id as string, 10);
    if (isNaN(issueId)) {
      throw new Error("Invalid issue ID");
    }

    const result = await IssueService.getSingleIssue(issueId);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const issueId = parseInt(req.params.id as string, 10);
    if (isNaN(issueId)) {
      throw new Error("Invalid issue ID");
    }

    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    const result = await IssueService.updateIssue(issueId, req.body, userId, userRole);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const issueId = parseInt(req.params.id as string, 10);
    if (isNaN(issueId)) {
      throw new Error("Invalid issue ID");
    }

    await IssueService.deleteIssue(issueId);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Issue deleted successfully",
    });
  } catch (error) {
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
