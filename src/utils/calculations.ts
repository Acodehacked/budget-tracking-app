import { Expense } from '../types';

export const calculateTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const calculateExpensesByCategory = (expenses: Expense[]) => {
  const categoryTotals: { [key: string]: number } = {};
  
  expenses.forEach(expense => {
    categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
  });
  
  return categoryTotals;
};

export const getCurrentMonthExpenses = (expenses: Expense[]): Expense[] => {
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
  return expenses.filter(expense => expense.date.startsWith(currentMonth));
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getExpensesByDateRange = (expenses: Expense[], days: number): Expense[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return expenses.filter(expense => new Date(expense.date) >= cutoffDate);
};