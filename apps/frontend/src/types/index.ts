// ─── Feedback Types ─────────────────────────────────────────────────────────

export interface FeedbackUser {
    email: string;
    _id?: string;
}

export interface Feedback {
    _id: string;
    subject: string;
    message: string;
    rating: number;
    userId: FeedbackUser;
    createdAt?: string;
}

export interface FeedbackFormData {
    subject: string;
    message: string;
    rating: number;
}

// ─── Auth Types ─────────────────────────────────────────────────────────────

export type UserRole = "user" | "admin";

export interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    role: UserRole | null;
    login: (token: string) => void;
    logout: () => void;
}

export interface DecodedToken {
    role: UserRole;
}

// ─── API Types ──────────────────────────────────────────────────────────────

export interface PaginationParams {
    page?: number;
    limit?: number;
}

export interface AdminFeedbackParams extends PaginationParams {
    rating?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    totalPages: number;
}

// ─── Component Prop Types ───────────────────────────────────────────────────

export type SortField = "subject" | "rating" | "email";
export type SortDirection = "asc" | "desc";
