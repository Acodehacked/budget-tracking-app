import React from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { BudgetSettings } from './components/BudgetSettings';
import { useBudget } from './hooks/useBudget';

function App() {
  const { expenses, budget, addExpense, deleteExpense, updateBudget } = useBudget();

  const handleAddExpense = (expenseData: any) => {
    addExpense({
      amount: parseFloat(expenseData.amount),
      description: expenseData.description,
      category: expenseData.category,
      date: expenseData.date,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Dashboard and Budget Settings */}
          <div className="lg:col-span-2 space-y-8">
            <Dashboard expenses={expenses} budget={budget} />
            <ExpenseForm onSubmit={handleAddExpense} />
          </div>
          
          {/* Right Column - Budget Settings */}
          <div className="space-y-8">
            <BudgetSettings budget={budget} onUpdateBudget={updateBudget} />
          </div>
        </div>
        
        {/* Full Width - Expense List */}
        <div className="mt-8">
          <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
        </div>
      </main>
    </div>
  );
}

export default App;