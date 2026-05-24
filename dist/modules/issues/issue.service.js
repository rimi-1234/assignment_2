import { pool } from "../../db/index.js";
import { AppError } from "../../utils/AppError.js";
import { StatusCodes } from "http-status-codes";
const createIssue = async (payload, userId) => {
    const { title, description, type } = payload;
    if (!title || title.length > 150) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid title (max 150 characters)");
    }
    if (!description || description.length < 20) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid description (min 20 characters)");
    }
    if (type !== "bug" && type !== "feature_request") {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid type (bug or feature_request only)");
    }
    // Validate reporter exists
    const userCheck = await pool.query("SELECT id FROM users WHERE id = $1", [userId]);
    if (userCheck.rows.length === 0) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Reporter does not exist");
    }
    const result = await pool.query("INSERT INTO issues (title, description, type, status, reporter_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [title, description, type, "open", userId]);
    return result.rows[0];
};
const getIssues = async (filters) => {
    const { sort = "newest", type, status } = filters;
    let queryText = "SELECT * FROM issues";
    const queryParams = [];
    const filterClauses = [];
    if (type) {
        queryParams.push(type);
        filterClauses.push(`type = $${queryParams.length}`);
    }
    if (status) {
        queryParams.push(status);
        filterClauses.push(`status = $${queryParams.length}`);
    }
    if (filterClauses.length > 0) {
        queryText += " WHERE " + filterClauses.join(" AND ");
    }
    const sortOrder = sort === "oldest" ? "ASC" : "DESC";
    queryText += ` ORDER BY created_at ${sortOrder}`;
    const result = await pool.query(queryText, queryParams);
    const issues = result.rows;
    if (issues.length === 0) {
        return [];
    }
    // Fetch reporter details without JOINs
    const reporterIds = [...new Set(issues.map((i) => i.reporter_id))].filter(Boolean);
    let reportersMap = {};
    if (reporterIds.length > 0) {
        const reportersRes = await pool.query("SELECT id, name, role FROM users WHERE id = ANY($1)", [reporterIds]);
        reportersRes.rows.forEach((user) => {
            reportersMap[user.id] = {
                id: user.id,
                name: user.name,
                role: user.role,
            };
        });
    }
    return issues.map((issue) => {
        const { reporter_id, ...rest } = issue;
        return {
            ...rest,
            reporter: reportersMap[reporter_id] || null,
        };
    });
};
const getSingleIssue = async (issueId) => {
    const result = await pool.query("SELECT * FROM issues WHERE id = $1", [issueId]);
    if (result.rows.length === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, "Issue not found");
    }
    const issue = result.rows[0];
    const { reporter_id, ...rest } = issue;
    const userResult = await pool.query("SELECT id, name, role FROM users WHERE id = $1", [reporter_id]);
    const reporter = userResult.rows[0] || null;
    return {
        ...rest,
        reporter,
    };
};
const updateIssue = async (issueId, payload, userId, userRole) => {
    const issueCheck = await pool.query("SELECT * FROM issues WHERE id = $1", [issueId]);
    if (issueCheck.rows.length === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, "Issue not found");
    }
    const existingIssue = issueCheck.rows[0];
    // Authorization checks
    if (userRole !== "maintainer") {
        // Contributor checks
        if (existingIssue.reporter_id !== userId) {
            throw new AppError(StatusCodes.FORBIDDEN, "Forbidden access: You can only update your own issues");
        }
        if (existingIssue.status !== "open") {
            throw new AppError(StatusCodes.CONFLICT, "Conflict: You can only update issues that are open");
        }
    }
    const title = payload.title || existingIssue.title;
    const description = payload.description || existingIssue.description;
    const type = payload.type || existingIssue.type;
    // Only maintainers can update the status
    const status = userRole === "maintainer" ? (payload.status || existingIssue.status) : existingIssue.status;
    if (title.length > 150) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid title (max 150 characters)");
    }
    if (description.length < 20) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid description (min 20 characters)");
    }
    if (type !== "bug" && type !== "feature_request") {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid type");
    }
    if (status !== "open" && status !== "in_progress" && status !== "resolved") {
        throw new AppError(StatusCodes.BAD_REQUEST, "Invalid status");
    }
    const result = await pool.query("UPDATE issues SET title = $1, description = $2, type = $3, status = $4, updated_at = NOW() WHERE id = $5 RETURNING *", [title, description, type, status, issueId]);
    return result.rows[0];
};
const deleteIssue = async (issueId) => {
    const issueCheck = await pool.query("SELECT * FROM issues WHERE id = $1", [issueId]);
    if (issueCheck.rows.length === 0) {
        throw new AppError(StatusCodes.NOT_FOUND, "Issue not found");
    }
    await pool.query("DELETE FROM issues WHERE id = $1", [issueId]);
};
export const IssueService = {
    createIssue,
    getIssues,
    getSingleIssue,
    updateIssue,
    deleteIssue,
};
//# sourceMappingURL=issue.service.js.map