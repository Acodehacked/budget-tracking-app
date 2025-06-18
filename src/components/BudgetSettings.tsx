import React, { useState } from 'react';
import { Settings, Target, Save } from 'lucide-react';
import { Budget } from '../types';
import { formatCurrency } from '../utils/calculations';

interface BudgetSettingsProps {
  budget: Budget;
  onUpdateBudget: (monthlyLimit: number) => void;
}

export const BudgetSettings: React.FC<BudgetSettingsProps> = ({ budget, onUpdateBudget }) => {
  const [budgetAmount, setBudgetAmount] = useState(budget.monthlyLimit.toString());
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const amount = parseFloat(budgetAmount);
    if (isNaN(amount) || amount < 0) return;

    setIsSaving(true);
    
    // Simulate a brief loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    
    onUpdateBudget(amount);
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setBudgetAmount(budget.monthlyLimit.toString());
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-50 rounded-lg mr-3">
            <Target className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Budget Settings</h3>
            <p className="text-sm text-gray-600">Set your monthly spending limit</p>
          </div>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            title="Edit budget"
          >
            <Settings className="h-5 w-5" />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="budget-amount" className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Budget Limit
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="budget-amount"
                step="0.01"
                min="0"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
                className="block w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                placeholder="0.00"
                autoFocus
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSaving ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Save className="h-4 w-4 mr-2" />
                  Save Budget
                </div>
              )}
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {budget.monthlyLimit > 0 ? formatCurrency(budget.monthlyLimit) : 'No budget set'}
          </div>
          <p className="text-gray-600">
            {budget.monthlyLimit > 0 
              ? 'Your monthly spending limit' 
              : 'Click the settings icon to set your budget'
            }
          </p>
        </div>
      )}
    </div>
  );
};