import React from 'react';
import { PiggyBank } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="p-2 bg-blue-600 rounded-lg mr-3">
                <PiggyBank className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">BudgetTracker</h1>
                <p className="text-sm text-gray-600">Smart financial management</p>
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="text-right">
              <p className="text-sm text-gray-600">Today</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};