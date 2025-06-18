import { useState, useEffect } from 'react';
import { Expense, Budget } from '../types';

const STORAGE_KEYS = {
  EXPENSES: 'budget-app-expenses',
  BUDGET: 'budget-app-budget',
};

export const useBudget = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<Budget>({
    monthlyLimit: 0,
    currentMonth: new Date().toISOString().slice(0, 7),
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    const savedBudget = localStorage.getItem(STORAGE_KEYS.BUDGET);

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }

    if (savedBudget) {
      setBudget(JSON.parse(savedBudget));
    }
  }, []);

  // Save expenses to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }, [expenses]);

  // Save budget to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUDGET, JSON.stringify(budget));
  }, [budget]);

  const addExpense = (expense: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const updateBudget = (monthlyLimit: number) => {
    setBudget(prev => ({
      ...prev,
      monthlyLimit,
    }));
  };

  return {
    expenses,
    budget,
    addExpense,
    deleteExpense,
    updateBudget,
  };
};