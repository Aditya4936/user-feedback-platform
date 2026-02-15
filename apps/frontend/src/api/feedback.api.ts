import type { FeedbackFormData, PaginationParams, AdminFeedbackParams } from "../types";
import apiClient from "../lib/axios";

export const getMyFeedbackApi = (params?: PaginationParams) =>
    apiClient.get("/feedback/my", { params });

export const getAllFeedbackApi = (params?: AdminFeedbackParams) =>
    apiClient.get("/feedback/admin/all", { params });

export const createFeedbackApi = (data: FeedbackFormData) =>
    apiClient.post("/feedback", data);

export const updateFeedbackApi = (id: string, data: FeedbackFormData) =>
    apiClient.put(`/feedback/${id}`, data);

export const deleteFeedbackApi = (id: string) =>
    apiClient.delete(`/feedback/${id}`);