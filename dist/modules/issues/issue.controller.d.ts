import type { Request, Response, NextFunction } from "express";
export declare const IssueController: {
    createIssue: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getIssues: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getSingleIssue: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateIssue: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteIssue: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=issue.controller.d.ts.map