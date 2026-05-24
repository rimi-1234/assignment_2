export interface ICreateIssuePayload {
    title: string;
    description: string;
    type: "bug" | "feature_request";
}
export interface IUpdateIssuePayload {
    title?: string;
    description?: string;
    type?: "bug" | "feature_request";
    status?: "open" | "in_progress" | "resolved";
}
export interface IReporterDetails {
    id: number;
    name: string;
    role: string;
}
export interface IIssueResponse {
    id: number;
    title: string;
    description: string;
    type: string;
    status: string;
    reporter?: IReporterDetails;
    reporter_id?: number;
    created_at: string | Date;
    updated_at: string | Date;
}
//# sourceMappingURL=issue.interface.d.ts.map