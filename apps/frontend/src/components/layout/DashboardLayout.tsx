
import React from 'react';
import { useAuth } from '../../lib/auth-context';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Settings, LogOut, User } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const navigation = [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Feedback', href: '/dashboard/feedback', icon: MessageSquare },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
                <div className="flex items-center justify-center h-16 border-b border-gray-200 px-6">
                    <span className="text-xl font-bold text-indigo-600">FeedbackApp</span>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="px-3 space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${isActive(item.href)
                                            ? 'bg-indigo-50 text-indigo-600'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                                >
                                    <Icon className={`mr-3 h-5 w-5 ${isActive(item.href) ? 'text-indigo-500' : 'text-gray-400'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center mb-4">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <User className="h-5 w-5" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
                            <p className="text-xs text-gray-500 truncate w-32">{user?.email || 'email@example.com'}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 md:hidden">
                    <span className="text-xl font-bold text-indigo-600">FeedbackApp</span>
                    {/* Mobile menu button could go here */}
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
