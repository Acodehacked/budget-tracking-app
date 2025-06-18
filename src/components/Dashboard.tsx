import React from 'react';
import { Wallet, TrendingUp, TrendingDown, Target } from 'lucide-react';
import { Expense, Budget } from '../types';
import { calculateTotalExpenses, getCurrentMonthExpenses, formatCurrency } from '../utils/calculations';

interface DashboardProps {
  expenses: Expense[];
  budget: Budget;
}

export const Dashboard: React.FC<DashboardProps> = ({ expenses, budget }) => {
  const currentMonthExpenses = getCurrentMonthExpenses(expenses);
  const totalExpenses = calculateTotalExpenses(currentMonthExpenses);
  const remainingBudget = budget.monthlyLimit - totalExpenses;
  const budgetUsagePercentage = budget.monthlyLimit > 0 ? (totalExpenses / budget.monthlyLimit) * 100 : 0;

  const stats = [
    {
      title: 'Monthly Budget',
      value: formatCurrency(budget.monthlyLimit),
      icon: Target,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      icon: TrendingDown,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Remaining Budget',
      value: formatCurrency(remainingBudget),
      icon: remainingBudget >= 0 ? Wallet : TrendingUp,
      color: remainingBudget >= 0 ? 'bg-green-500' : 'bg-orange-500',
      textColor: remainingBudget >= 0 ? 'text-green-600' : 'text-orange-600',
      bgColor: remainingBudget >= 0 ? 'bg-green-50' : 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Track your spending and stay within budget</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {budget.monthlyLimit > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Progress</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {formatCurrency(totalExpenses)} of {formatCurrency(budget.monthlyLimit)}
              </span>
              <span className={`font-semibold ${budgetUsagePercentage > 100 ? 'text-red-600' : 'text-gray-900'}`}>
                {budgetUsagePercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  budgetUsagePercentage > 100
                    ? 'bg-red-500'
                    : budgetUsagePercentage > 80
                    ? 'bg-orange-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(budgetUsagePercentage, 100)}%` }}
              />
            </div>
            {budgetUsagePercentage > 90 && (
              <p className={`text-sm font-medium ${budgetUsagePercentage > 100 ? 'text-red-600' : 'text-orange-600'}`}>
                {budgetUsagePercentage > 100
                  ? `You're over budget by ${formatCurrency(Math.abs(remainingBudget))}`
                  : "You're approaching your budget limit"}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};