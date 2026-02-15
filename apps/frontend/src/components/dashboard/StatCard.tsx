import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    gradient: string;
    bgLight: string;
    index: number;
    loading: boolean;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
    }),
};

export function StatCard({
    label,
    value,
    icon: Icon,
    gradient,
    bgLight,
    index,
    loading,
}: StatCardProps) {
    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative group rounded-2xl border border-white/6 bg-white/3 backdrop-blur-sm p-5 overflow-hidden hover:border-white/10 transition-colors duration-300"
        >
            {/* Gradient glow on hover */}
            <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br ${gradient} blur-xl`}
                style={{ opacity: 0 }}
            />
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div
                        className={`w-10 h-10 rounded-xl ${bgLight} flex items-center justify-center`}
                    >
                        <Icon
                            className={`w-5 h-5 bg-linear-to-r ${gradient} bg-clip-text`}
                            style={{ color: "currentColor" }}
                        />
                    </div>
                </div>
                <p className="text-3xl font-bold tracking-tight">
                    {loading ? "—" : value}
                </p>
                <p className="text-sm text-slate-400 mt-1">{label}</p>
            </div>
        </motion.div>
    );
}
