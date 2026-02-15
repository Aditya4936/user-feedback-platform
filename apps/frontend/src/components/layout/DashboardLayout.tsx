import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Users, TrendingUp, Sparkles, AlertCircle } from "lucide-react";

import type { Feedback, SortField, SortDirection } from "../../types";
import { ERROR_MESSAGES, DEFAULT_PAGE_SIZE } from "../../constants";
import { getAllFeedbackApi } from "../../api/feedback.api";
import { useAuth } from "../../auth/AuthContext";
import { Navbar, StatCard, FeedbackTable } from "../dashboard";

// ─── Stat Card Configuration ────────────────────────────────────────────────

const STAT_CARD_CONFIG = [
    {
        key: "total" as const,
        label: "Total Feedback",
        icon: MessageSquare,
        gradient: "from-violet-500 to-purple-600",
        bgLight: "bg-violet-500/10",
    },
    {
        key: "avgRating" as const,
        label: "Avg Rating",
        icon: TrendingUp,
        gradient: "from-amber-500 to-orange-500",
        bgLight: "bg-amber-500/10",
    },
    {
        key: "uniqueUsers" as const,
        label: "Unique Users",
        icon: Users,
        gradient: "from-cyan-500 to-blue-500",
        bgLight: "bg-cyan-500/10",
    },
    {
        key: "highRated" as const,
        label: "High Rated (4-5★)",
        icon: Sparkles,
        gradient: "from-emerald-500 to-green-500",
        bgLight: "bg-emerald-500/10",
    },
];

// ─── Main Component ─────────────────────────────────────────────────────────

export default function DashboardLayout() {
    const [data, setData] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState<SortField>("subject");
    const [sortDir, setSortDir] = useState<SortDirection>("asc");
    const { logout } = useAuth();

    // ─── Server-side Pagination State ─────────────────────────────────────

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // ─── Fetch Data ─────────────────────────────────────────────────────────

    const fetchData = useCallback(async (page: number, limit: number) => {
        setLoading(true);
        setError("");

        try {
            const res = await getAllFeedbackApi({ page, limit });
            setData(res.data.data);
            setTotalRecords(res.data.total);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.page);
        } catch {
            setError(ERROR_MESSAGES.FEEDBACK_LOAD_FAILED);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(currentPage, pageSize);
    }, [currentPage, pageSize, fetchData]);

    // ─── Pagination Handlers ─────────────────────────────────────────────

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const handlePageSizeChange = useCallback((size: number) => {
        setPageSize(size);
        setCurrentPage(1);
    }, []);

    // ─── Derived Stats (from current page data) ─────────────────────────

    const stats = useMemo(() => {
        const avgRating =
            data.length > 0
                ? (data.reduce((sum, fb) => sum + fb.rating, 0) / data.length).toFixed(1)
                : "0";
        const uniqueUsers = new Set(data.map((fb) => fb.userId?.email)).size;
        const highRated = data.filter((fb) => fb.rating >= 4).length;

        return { total: totalRecords, avgRating, uniqueUsers, highRated };
    }, [data, totalRecords]);

    // ─── Client-side Filter & Sort (on the current page) ────────────────

    const filteredData = useMemo(() => {
        const searchLower = search.toLowerCase();

        const result = data.filter(
            (fb) =>
                fb.subject.toLowerCase().includes(searchLower) ||
                fb.message.toLowerCase().includes(searchLower) ||
                fb.userId?.email?.toLowerCase().includes(searchLower)
        );

        result.sort((a, b) => {
            let valA: string | number;
            let valB: string | number;

            if (sortField === "rating") {
                valA = a.rating;
                valB = b.rating;
            } else if (sortField === "email") {
                valA = a.userId?.email?.toLowerCase() ?? "";
                valB = b.userId?.email?.toLowerCase() ?? "";
            } else {
                valA = a.subject.toLowerCase();
                valB = b.subject.toLowerCase();
            }

            if (valA < valB) return sortDir === "asc" ? -1 : 1;
            if (valA > valB) return sortDir === "asc" ? 1 : -1;
            return 0;
        });

        return result;
    }, [data, search, sortField, sortDir]);

    // ─── Sort Handler ───────────────────────────────────────────────────────

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortDir("asc");
        }
    };

    // ─── Render ─────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen bg-[#0f0f1a] text-white font-['Inter',sans-serif]">
            {/* Background decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <Navbar onLogout={logout} />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold tracking-tight">
                        Admin Dashboard
                    </h1>
                    <p className="mt-1 text-slate-400 text-sm">
                        Monitor and manage all user feedback in one place
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    {STAT_CARD_CONFIG.map((card, i) => (
                        <StatCard
                            key={card.key}
                            label={card.label}
                            value={stats[card.key]}
                            icon={card.icon}
                            gradient={card.gradient}
                            bgLight={card.bgLight}
                            index={i}
                            loading={loading}
                        />
                    ))}
                </div>

                {/* Error State */}
                {error && (
                    <div className="mb-6 px-6 py-4 flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                        <p className="text-sm text-red-300">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="px-6 py-20 text-center">
                        <div className="inline-flex items-center gap-3">
                            <div className="w-5 h-5 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                            <span className="text-slate-400 text-sm">
                                Loading feedback data...
                            </span>
                        </div>
                    </div>
                )}

                {/* Feedback Table */}
                {!loading && !error && (
                    <FeedbackTable
                        data={filteredData}
                        totalCount={totalRecords}
                        uniqueUsers={stats.uniqueUsers}
                        search={search}
                        sortField={sortField}
                        sortDir={sortDir}
                        onSearchChange={setSearch}
                        onSort={handleSort}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                    />
                )}
            </main>
        </div>
    );
}
