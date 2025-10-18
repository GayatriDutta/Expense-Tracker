import React from 'react';
import { Edit3, Trash2, Calendar, Tag } from 'lucide-react';
import type { Expense } from '../types';
import { formatCurrency, formatDate } from '../utils';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onEdit,
  onDelete,
}) => {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-400 mb-4">
          <Tag size={48} className="mx-auto" />
        </div>
        <p className="text-gray-500 text-lg">No expenses yet</p>
        <p className="text-gray-400">Start by adding your first expense above</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Recent Expenses</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    // style={{ backgroundColor: getCategoryColor(expense.category) }}
                  />
                  <h4 className="text-lg font-medium text-gray-900 truncate">
                    {expense.description}
                  </h4>
                  <span className="text-lg font-semibold text-red-600">
                    -{formatCurrency(expense.amount)}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Tag size={14} />
                    {/* <span>{getCategoryLabel(expense.category)}</span> */}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatDate(expense.date)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => onEdit(expense)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label="Edit expense"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => onDelete(expense.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Delete expense"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;