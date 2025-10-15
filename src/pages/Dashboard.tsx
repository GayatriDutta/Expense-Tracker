import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calendar, PieChart} from 'lucide-react';
import { formatCurrency } from '../utils';
import api from '../api/api';

interface DashboardStats {
  totalExpenses: number;
  monthlyExpenses: number;
  averageExpense: number;
  topCategory: string;
  // budgetStatus: 'good' | 'warning' | 'danger';
  budgetUsed: number;
  // budgetTotal: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>();
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [expensesRes, analyticsRes] = await Promise.all([
        api.get('/expenses?limit=5'),
        api.get('/expenses/analytics?period=monthly'),
      ]);

      const expenses = expensesRes.data;
      const analytics = analyticsRes.data;

      const currentMonth = new Date().toISOString().slice(0, 7);
      const monthlyExpenses = expenses
        .filter((expense: any) => expense.date.startsWith(currentMonth))
        .reduce((sum: number, expense: any) => sum + Number(expense.amount), 0);

      // const totalBudget = budgets.reduce((sum: number, budget: any) => sum + Number(budget.amount), 0);
      const budgetUsed = monthlyExpenses;
      // const budgetPercentage = totalBudget > 0 ? (budgetUsed / totalBudget) * 100 : 0;

      // let budgetStatus: 'good' | 'warning' | 'danger' = 'good';
      // if (budgetPercentage > 90) budgetStatus = 'danger';
      // else if (budgetPercentage > 75) budgetStatus = 'warning';

      setStats({
        totalExpenses: analytics.total,
        monthlyExpenses,
        averageExpense: expenses.length > 0 ? analytics.total / expenses.length : 0,
        topCategory: analytics.topCategories[0]?.[0] || 'None',
        budgetUsed,
      });

      setRecentExpenses(expenses.slice(0, 5));

      console.log(stats);
      console.log(recentExpenses)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Overview of your financial activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatCurrency(stats?.totalExpenses || 0)}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
              <DollarSign className="text-red-600 dark:text-red-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {formatCurrency(stats?.monthlyExpenses || 0)}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
              <Calendar className="text-orange-600 dark:text-orange-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Expense</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(stats?.averageExpense || 0)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Top Category</p>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400 truncate">
                {stats?.topCategory || 'None'}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <PieChart className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Budget Status
      {stats?.budgetTotal > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            {stats.budgetStatus === 'good' && <CheckCircle className="text-green-500" size={24} />}
            {stats.budgetStatus === 'warning' && <AlertTriangle className="text-yellow-500" size={24} />}
            {stats.budgetStatus === 'danger' && <AlertTriangle className="text-red-500" size={24} />}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Budget</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {formatCurrency(stats.budgetUsed)} of {formatCurrency(stats.budgetTotal)}
              </span>
              <span className={`font-medium ${
                stats.budgetStatus === 'good' ? 'text-green-600' :
                stats.budgetStatus === 'warning' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {((stats.budgetUsed / stats.budgetTotal) * 100).toFixed(1)}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  stats.budgetStatus === 'good' ? 'bg-green-500' :
                  stats.budgetStatus === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min((stats.budgetUsed / stats.budgetTotal) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )} */}

      {/* Recent Expenses */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Expenses</h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentExpenses.length > 0 ? (
            recentExpenses.map((expense: any) => (
              <div key={expense.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {expense.description}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {expense.category?.name} • {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                    -{formatCurrency(expense.amount)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No expenses yet. Start by adding your first expense!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;