import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star,
    ChevronDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    MessageSquare,
    Mail,
} from "lucide-react";

import type { Feedback, SortField, SortDirection } from "../../types";
import { RATING_OPTIONS, PAGE_SIZE_OPTIONS } from "../../constants";

// ─── Props ──────────────────────────────────────────────────────────────────

interface FeedbackTableProps {
    data: Feedback[];
    totalCount: number;
    uniqueUsers: number;
    search: string;
    sortField: SortField;
    sortDir: SortDirection;
    onSearchChange: (value: string) => void;
    onSort: (field: SortField) => void;

    // Server-side pagination
    currentPage: number;
    pageSize: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

// ─── Animation Variants ─────────────────────────────────────────────────────

const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.04, duration: 0.4, ease: "easeOut" as const },
    }),
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function SortIcon({
    field,
    currentField,
    currentDir,
}: {
    field: SortField;
    currentField: SortField;
    currentDir: SortDirection;
}) {
    if (currentField !== field) {
        return <ChevronDown className="w-3.5 h-3.5 opacity-30" />;
    }

    return currentDir === "asc" ? (
        <ChevronUp className="w-3.5 h-3.5 text-violet-400" />
    ) : (
        <ChevronDown className="w-3.5 h-3.5 text-violet-400" />
    );
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {RATING_OPTIONS.map((i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${i <= rating ? "text-amber-400 fill-amber-400" : "text-slate-600"
                        }`}
                />
            ))}
        </div>
    );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function FeedbackTable({
    data,
    totalCount,
    uniqueUsers,
    search,
    sortField,
    sortDir,
    onSearchChange,
    onSort,
    currentPage,
    pageSize,
    totalPages,
    onPageChange,
    onPageSizeChange,
}: FeedbackTableProps) {
    // ─── Pagination Display Logic ───────────────────────────────────────

    const startEntry = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endEntry = Math.min(currentPage * pageSize, totalCount);

    // Generate visible page numbers (show max 5 page buttons)
    const pageNumbers = useMemo(() => {
        const pages: number[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
            const end = Math.min(totalPages, start + maxVisible - 1);

            if (end - start < maxVisible - 1) {
                start = Math.max(1, end - maxVisible + 1);
            }

            for (let i = start; i <= end; i++) pages.push(i);
        }

        return pages;
    }, [totalPages, currentPage]);

    // ─── Render ─────────────────────────────────────────────────────────

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl border border-white/6 bg-white/2 backdrop-blur-sm overflow-hidden"
        >
            {/* Table Header */}
            <div className="px-6 py-5 border-b border-white/6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold">All Feedback</h2>
                    <p className="text-sm text-slate-400 mt-0.5">
                        {totalCount} total entries
                    </p>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search feedback..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full sm:w-72 pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/40 transition-all duration-200"
                    />
                </div>
            </div>

            {/* Empty State */}
            {data.length === 0 && (
                <div className="px-6 py-20 text-center">
                    <MessageSquare className="mx-auto w-12 h-12 text-slate-600 mb-4" />
                    <h3 className="text-sm font-medium text-slate-300">
                        {search ? "No matching feedback found" : "No feedback yet"}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        {search
                            ? "Try a different search term"
                            : "Feedback will appear here once users start submitting"}
                    </p>
                </div>
            )}

            {/* Table */}
            {data.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/6">
                                <SortableHeader
                                    label="Subject"
                                    field="subject"
                                    currentField={sortField}
                                    currentDir={sortDir}
                                    onSort={onSort}
                                />
                                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Message
                                </th>
                                <SortableHeader
                                    label="Rating"
                                    field="rating"
                                    currentField={sortField}
                                    currentDir={sortDir}
                                    onSort={onSort}
                                />
                                <SortableHeader
                                    label="User"
                                    field="email"
                                    currentField={sortField}
                                    currentDir={sortDir}
                                    onSort={onSort}
                                />
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {data.map((fb, i) => (
                                    <motion.tr
                                        key={fb._id}
                                        custom={i}
                                        variants={rowVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="border-b border-white/3 hover:bg-white/3 transition-colors duration-150 group"
                                    >
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                                                {fb.subject}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-slate-400 max-w-xs truncate">
                                                {fb.message}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StarRating rating={fb.rating} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-linear-to-br from-violet-500/30 to-purple-500/30 flex items-center justify-center text-xs font-semibold text-violet-300 shrink-0">
                                                    {fb.userId?.email?.charAt(0).toUpperCase() ?? "?"}
                                                </div>
                                                <span className="text-sm text-slate-400">
                                                    {fb.userId?.email ?? "Unknown"}
                                                </span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Footer with Pagination */}
            {totalCount > 0 && (
                <div className="px-6 py-4 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Left: Entry info & unique users */}
                    <div className="flex items-center gap-4">
                        <p className="text-xs text-slate-500">
                            Showing {startEntry}–{endEntry} of {totalCount}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Mail className="w-3.5 h-3.5" />
                            {uniqueUsers} unique user{uniqueUsers !== 1 ? "s" : ""}
                        </div>
                    </div>

                    {/* Right: Pagination controls */}
                    <div className="flex items-center gap-3">
                        {/* Page size selector */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">Rows:</span>
                            <select
                                value={pageSize}
                                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                                className="bg-white/5 border border-white/10 text-xs text-slate-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500/40 cursor-pointer"
                            >
                                {PAGE_SIZE_OPTIONS.map((size) => (
                                    <option key={size} value={size} className="bg-[#1a1a2e] text-white">
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Page navigation */}
                        <div className="flex items-center gap-1">
                            {/* Previous button */}
                            <button
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={currentPage <= 1}
                                className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400"
                            >
                                <ChevronLeft className="w-3.5 h-3.5" />
                            </button>

                            {/* Page numbers */}
                            {pageNumbers[0] > 1 && (
                                <>
                                    <button
                                        onClick={() => onPageChange(1)}
                                        className="min-w-[28px] h-7 text-xs rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                                    >
                                        1
                                    </button>
                                    {pageNumbers[0] > 2 && (
                                        <span className="text-xs text-slate-600 px-1">…</span>
                                    )}
                                </>
                            )}

                            {pageNumbers.map((page) => (
                                <button
                                    key={page}
                                    onClick={() => onPageChange(page)}
                                    className={`min-w-[28px] h-7 text-xs rounded-lg border transition-all duration-200 ${page === currentPage
                                            ? "bg-violet-500/20 border-violet-500/40 text-violet-300 font-semibold"
                                            : "border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {pageNumbers[pageNumbers.length - 1] < totalPages && (
                                <>
                                    {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                                        <span className="text-xs text-slate-600 px-1">…</span>
                                    )}
                                    <button
                                        onClick={() => onPageChange(totalPages)}
                                        className="min-w-[28px] h-7 text-xs rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                                    >
                                        {totalPages}
                                    </button>
                                </>
                            )}

                            {/* Next button */}
                            <button
                                onClick={() => onPageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages}
                                className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400"
                            >
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

// ─── Sortable Header ────────────────────────────────────────────────────────

function SortableHeader({
    label,
    field,
    currentField,
    currentDir,
    onSort,
}: {
    label: string;
    field: SortField;
    currentField: SortField;
    currentDir: SortDirection;
    onSort: (field: SortField) => void;
}) {
    return (
        <th
            onClick={() => onSort(field)}
            className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-400 cursor-pointer hover:text-slate-200 transition-colors select-none"
        >
            <span className="inline-flex items-center gap-1.5">
                {label}
                <SortIcon
                    field={field}
                    currentField={currentField}
                    currentDir={currentDir}
                />
            </span>
        </th>
    );
}
