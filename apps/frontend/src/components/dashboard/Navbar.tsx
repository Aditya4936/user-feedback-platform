import { LogOut, BarChart3 } from "lucide-react";

import { APP_NAME } from "../../constants";

interface NavbarProps {
    onLogout: () => void;
}

export function Navbar({ onLogout }: NavbarProps) {
    return (
        <nav className="relative z-10 border-b border-white/5 bg-white/2 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                            <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-semibold tracking-tight">
                            {APP_NAME.slice(0, 8)}
                            <span className="text-violet-400">{APP_NAME.slice(8)}</span>
                        </span>
                    </div>
                    <div
                        onClick={onLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer border border-transparent hover:border-white/10"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </div>
                </div>
            </div>
        </nav>
    );
}
