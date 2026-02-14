
import React from 'react';
import { cn } from '../../lib/utils';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, className, id, ...props }) => {
    const inputId = id || props.name;

    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-slate-300 ml-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <textarea
                    id={inputId}
                    className={cn(
                        "flex min-h-[120px] w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500",
                        "disabled:cursor-not-allowed disabled:opacity-50 resize-y",
                        error && "border-red-500/50 focus:ring-red-500/25 focus:border-red-500",
                        className
                    )}
                    {...props}
                />
            </div>
            {error && <p className="text-xs text-red-400 ml-1 animate-in slide-in-from-top-1 fade-in duration-200">{error}</p>}
        </div>
    );
};
