import type { ICreateIssuePayload, IUpdateIssuePayload, IIssueResponse } from "./issue.interface.js";
export declare const IssueService: {
    createIssue: (payload: ICreateIssuePayload, userId: number) => Promise<IIssueResponse>;
    getIssues: (filters: {
        sort?: string;
        type?: string;
        status?: string;
    }) => Promise<IIssueResponse[]>;
    getSingleIssue: (issueId: number) => Promise<IIssueResponse>;
    updateIssue: (issueId: number, payload: IUpdateIssuePayload, userId: number, userRole: string) => Promise<IIssueResponse>;
    deleteIssue: (issueId: number) => Promise<void>;
};
//# sourceMappingURL=issue.service.d.ts.map