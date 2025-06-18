import { ExpenseCategory } from '../types';

export const defaultCategories: ExpenseCategory[] = [
  { id: 'food', name: 'Food & Dining', color: '#F59E0B', icon: 'UtensilsCrossed' },
  { id: 'transportation', name: 'Transportation', color: '#3B82F6', icon: 'Car' },
  { id: 'shopping', name: 'Shopping', color: '#8B5CF6', icon: 'ShoppingBag' },
  { id: 'entertainment', name: 'Entertainment', color: '#EF4444', icon: 'Film' },
  { id: 'bills', name: 'Bills & Utilities', color: '#10B981', icon: 'Receipt' },
  { id: 'healthcare', name: 'Healthcare', color: '#F97316', icon: 'Heart' },
  { id: 'education', name: 'Education', color: '#06B6D4', icon: 'GraduationCap' },
  { id: 'other', name: 'Other', color: '#6B7280', icon: 'MoreHorizontal' },
];