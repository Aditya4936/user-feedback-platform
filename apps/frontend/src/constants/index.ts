// ─── Application Constants ──────────────────────────────────────────────────

export const APP_NAME = "FeedbackHub";

export const RATING_OPTIONS = [1, 2, 3, 4, 5] as const;

// ─── Pagination ─────────────────────────────────────────────────────────────

export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;
export const DEFAULT_PAGE_SIZE = 10;

export const STORAGE_KEYS = {
    ACCESS_TOKEN: "accessToken",
} as const;

// ─── Error Messages ─────────────────────────────────────────────────────────

export const ERROR_MESSAGES = {
    LOGIN_FAILED: "Login failed. Please check your credentials.",
    REGISTER_FAILED: "Register failed. Please try again.",
    UNEXPECTED_ERROR: "An unexpected error occurred.",
    OPERATION_FAILED: "Operation failed. Please try again.",
    DELETE_FAILED: "Delete failed.",
    FEEDBACK_LOAD_FAILED: "Failed to load feedback data.",
} as const;

// ─── Route Paths ────────────────────────────────────────────────────────────

export const ROUTES = {
    LOGIN: "/login",
    REGISTER: "/register",
    FEEDBACK: "/feedback",
    DASHBOARD: "/dashboard",
} as const;
