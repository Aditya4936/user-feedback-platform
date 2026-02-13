
import React from 'react';
import { MessageSquare, Users, TrendingUp, Filter } from 'lucide-react';

export const Dashboard: React.FC = () => {
    const stats = [
        { name: 'Total Feedback', value: '1,234', icon: MessageSquare, change: '+12%', changeType: 'increase' },
        { name: 'Active Users', value: '890', icon: Users, change: '+5.4%', changeType: 'increase' },
        { name: 'Completion Rate', value: '88%', icon: TrendingUp, change: '-2%', changeType: 'decrease' },
    ];

    return (
        <div className="space-y-6 p-6 h-screen bg-gray-300">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <div className="flex space-x-2">
                    <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg p-5">
                            <div className="flex items-center">
                                <div className="shrink-0 bg-indigo-50 rounded-md p-3">
                                    <Icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">{item.value}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className={`text-sm font-medium ${item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.change}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">from last month</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Feedback Placeholder */}
            <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Feedback</h3>
                </div>
                <div className="p-6 text-center text-gray-500 py-12">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No feedback yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new feedback form.</p>
                </div>
            </div>
        </div>
    );
};
