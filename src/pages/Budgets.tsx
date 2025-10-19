
import React, { useState, useEffect } from 'react';
import {
  Plus, CreditCard as Edit3, Trash2, Target,
  AlertTriangle, CheckCircle, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils';
import {
  createBudget, deleteBudget, getAllBudget,
  getAllCategories, getAllExpenses, updateBudget
} from '../api/service.api';
import type { Expense } from '../types';

interface Budget {
  id: string;
  amount: number;
  month: string;
  categoryId: string;
  category: any;
}

interface Category {
  id: string;
  icon: string;
  name: string;
}

const Budgets: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [formData, setFormData] = useState({
    amount: '',
    month: new Date().toISOString().slice(0, 7),
    categoryId: '19',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [budgetsData, categoriesData, expensesData] = await Promise.all([
        getAllBudget(),
        getAllCategories(),
        getAllExpenses(),
      ]);
      setBudgets(budgetsData);
      setCategories(categoriesData);
      setExpenses(expensesData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const budgetData = {
        amount: parseFloat(formData.amount),
        month: formData.month,
        categoryId: formData.categoryId,
        userId: user.id,
      };
      if (editingBudget) {
        await updateBudget(editingBudget.id, budgetData);
      } else {
        await createBudget(budgetData);
      }
      await fetchData();
      resetForm();
    } catch (error) {
      console.error('Failed to save budget:', error);
    }
  };

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setFormData({
      amount: budget.amount.toString(),
      month: budget.month,
      categoryId: budget.categoryId || '110',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        await deleteBudget(id);
        await fetchData();
      } catch (error) {
        console.error('Failed to delete budget:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      amount: '',
      month: new Date().toISOString().slice(0, 7),
      categoryId: '',
    });
    setEditingBudget(null);
    setShowForm(false);
  };

  const getBudgetStatus = (budget: Budget) => {
    const monthExpenses = expenses.filter(expense => {
      const expenseMonth = expense.date.slice(0, 7);
      const matchesMonth = expenseMonth === budget.month;
      const matchesCategory = budget.category.name !== 'All Categories'
        ? expense.categoryId === budget.categoryId
        : true;
      return matchesMonth && matchesCategory;
    });

    const spent = monthExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    const percentage = (spent / Number(budget.amount)) * 100;

    let status: 'good' | 'warning' | 'danger' = 'good';
    if (percentage > 90) status = 'danger';
    else if (percentage > 75) status = 'warning';
    return { spent, percentage, status };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="text-gray-600 dark:text-gray-400" size={20} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Budget Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
              Set and track your monthly spending limits
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
        >
          <Plus size={18} />
          Add Budget
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {editingBudget ? 'Edit Budget' : 'Add New Budget'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl leading-none"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Budget Amount ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="0.00"
                />
              </div>

              {/* Month */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Month
                </label>
                <input
                  type="month"
                  required
                  value={formData.month}
                  onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category (Optional)
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {editingBudget ? 'Update Budget' : 'Create Budget'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Budget Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {budgets.length > 0 ? (
          budgets.map((budget) => {
            const { spent, percentage, status } = getBudgetStatus(budget);
            const monthName = new Date(budget.month + '-01').toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            });

            return (
              <div
                key={budget.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
                  <div className="flex items-center gap-3">
                    {status === 'good' && <CheckCircle className="text-green-500" size={24} />}
                    {status === 'warning' && <AlertTriangle className="text-yellow-500" size={24} />}
                    {status === 'danger' && <AlertTriangle className="text-red-500" size={24} />}

                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                        {budget.category?.name || 'Overall Budget'} - {monthName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatCurrency(spent)} of {formatCurrency(Number(budget.amount))} spent
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleEdit(budget)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(budget.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span
                      className={`font-medium ${
                        status === 'good'
                          ? 'text-green-600'
                          : status === 'warning'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {percentage.toFixed(1)}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        status === 'good'
                          ? 'bg-green-500'
                          : status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600 dark:text-gray-400 gap-1 sm:gap-0">
                    <span>
                      Remaining: {formatCurrency(Math.max(0, Number(budget.amount) - spent))}
                    </span>
                    {percentage > 100 && (
                      <span className="text-red-600 font-medium">
                        Over budget by {formatCurrency(spent - Number(budget.amount))}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center border border-gray-200 dark:border-gray-700">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Target size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">No budgets set</p>
            <p className="text-gray-400 dark:text-gray-500">
              Create your first budget to start tracking your spending limits
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add Your First Budget
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Budgets;
