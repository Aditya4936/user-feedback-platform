import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import type { Feedback, FeedbackFormData } from "../types";
import {
    createFeedbackApi,
    deleteFeedbackApi,
    getMyFeedbackApi,
    updateFeedbackApi,
} from "../api/feedback.api";
import { ERROR_MESSAGES } from "../constants";

interface UseFeedbackReturn {
    feedbacks: Feedback[];
    fetchLoading: boolean;
    submitLoading: boolean;
    error: string;
    editing: Feedback | null;
    formData: FeedbackFormData;
    setFormField: <K extends keyof FeedbackFormData>(
        key: K,
        value: FeedbackFormData[K]
    ) => void;
    handleEdit: (feedback: Feedback) => void;
    cancelEdit: () => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    handleDelete: (id: string) => Promise<void>;
}

const INITIAL_FORM_DATA: FeedbackFormData = {
    subject: "",
    message: "",
    rating: 1,
};

export function useFeedback(): UseFeedbackReturn {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState("");
    const [editing, setEditing] = useState<Feedback | null>(null);
    const [formData, setFormData] = useState<FeedbackFormData>(INITIAL_FORM_DATA);

    // ─── Fetch feedbacks ────────────────────────────────────────────────────

    const fetchFeedbacks = useCallback(async () => {
        setFetchLoading(true);
        try {
            const res = await getMyFeedbackApi();
            setFeedbacks(res.data.data);
        } catch (err) {
            console.error("Failed to fetch feedbacks:", err);
        } finally {
            setFetchLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFeedbacks();
    }, [fetchFeedbacks]);

    // ─── Form field setter ──────────────────────────────────────────────────

    const setFormField = useCallback(
        <K extends keyof FeedbackFormData>(key: K, value: FeedbackFormData[K]) => {
            setFormData((prev) => ({ ...prev, [key]: value }));
        },
        []
    );

    const resetForm = useCallback(() => {
        setFormData(INITIAL_FORM_DATA);
        setEditing(null);
        setError("");
    }, []);

    // ─── Edit handler ───────────────────────────────────────────────────────

    const handleEdit = useCallback((feedback: Feedback) => {
        setEditing(feedback);
        setFormData({
            subject: feedback.subject,
            message: feedback.message,
            rating: feedback.rating,
        });
        setError("");
    }, []);

    // ─── Cancel edit ────────────────────────────────────────────────────────

    const cancelEdit = useCallback(() => {
        resetForm();
    }, [resetForm]);

    // ─── Create or update ──────────────────────────────────────────────────

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();
            setError("");
            setSubmitLoading(true);

            try {
                if (editing) {
                    await updateFeedbackApi(editing._id, formData);
                } else {
                    await createFeedbackApi(formData);
                }
                resetForm();
                await fetchFeedbacks();
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(
                        err.response?.data?.message || ERROR_MESSAGES.OPERATION_FAILED
                    );
                } else {
                    setError(ERROR_MESSAGES.UNEXPECTED_ERROR);
                }
                console.error(err);
            } finally {
                setSubmitLoading(false);
            }
        },
        [editing, formData, fetchFeedbacks, resetForm]
    );

    // ─── Delete handler ────────────────────────────────────────────────────

    const handleDelete = useCallback(
        async (id: string) => {
            if (!window.confirm("Are you sure you want to delete this feedback?")) {
                return;
            }

            try {
                await deleteFeedbackApi(id);

                if (editing?._id === id) {
                    resetForm();
                }

                await fetchFeedbacks();
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(
                        err.response?.data?.message || ERROR_MESSAGES.DELETE_FAILED
                    );
                } else {
                    setError(ERROR_MESSAGES.UNEXPECTED_ERROR);
                }
                console.error(err);
            }
        },
        [editing, fetchFeedbacks, resetForm]
    );

    return {
        feedbacks,
        fetchLoading,
        submitLoading,
        error,
        editing,
        formData,
        setFormField,
        handleEdit,
        cancelEdit,
        handleSubmit,
        handleDelete,
    };
}
