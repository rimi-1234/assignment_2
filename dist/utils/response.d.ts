import type { Response } from "express";
export declare const sendResponse: <T>(res: Response, data: {
    statusCode: number;
    success: boolean;
    message?: string;
    data?: T;
}) => void;
//# sourceMappingURL=response.d.ts.map