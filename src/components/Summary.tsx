import React from 'react';
import { DollarSign, TrendingUp, Calendar, PieChart } from 'lucide-react';
import type { Expense } from '../types';
import { formatCurrency, getCategorySummary, getMonthlySummary } from '../utils';

interface SummaryProps {
  expenses: Expense[];
}

const Summary: React.FC<SummaryProps> = ({ expenses }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const avgExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  const categorySummary = getCategorySummary(expenses);
  const monthlySummary = getMonthlySummary(expenses);
  
  const thisMonth = new Date().toISOString().slice(0, 7);
  const thisMonthExpenses = expenses.filter(
    expense => expense.date.startsWith(thisMonth)
  );
  const thisMonthTotal = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const topCategory = categorySummary.reduce(
    (max, category) => category.total > max.total ? category : max,
    { category: 'None', total: 0, count: 0, percentage: 0 }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(totalExpenses)}
            </p>
          </div>
          <div className="p-3 bg-red-100 rounded-full">
            <DollarSign className="text-red-600" size={24} />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {expenses.length} transaction{expenses.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">This Month</p>
            <p className="text-2xl font-bold text-orange-600">
              {formatCurrency(thisMonthTotal)}
            </p>
          </div>
          <div className="p-3 bg-orange-100 rounded-full">
            <Calendar className="text-orange-600" size={24} />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {thisMonthExpenses.length} transaction{thisMonthExpenses.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Average Expense</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(avgExpense)}
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <TrendingUp className="text-blue-600" size={24} />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Per transaction
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Top Category</p>
            <p className="text-lg font-bold text-purple-600 truncate">
              {topCategory.category !== 'None' ? topCategory.category : 'None'}
            </p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <PieChart className="text-purple-600" size={24} />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {topCategory.total > 0 ? formatCurrency(topCategory.total) : 'No expenses'}
        </p>
      </div>
    </div>
  );
};

export default Summary;