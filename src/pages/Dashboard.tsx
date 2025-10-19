import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calendar, PieChart, AlertTriangle, CheckCircle} from 'lucide-react';
import { formatCurrency } from '../utils';
import api from '../api/api';

interface DashboardStats {
  totalExpenses: number;
  monthlyExpenses: number;
  averageExpense: number;
  topCategory: string;
  budgetStatus: 'good' | 'warning' | 'danger';
  budgetUsed: number;
  budgetTotal: number;
}
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <div className="bg-white hover:scale-105 transition-transform duration-300 dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className={`text-2xl font-bold text-${color}-600 dark:text-${color}-400`}>
          {value}
        </p>
      </div>
      <div className={`p-3 bg-${color}-100 dark:bg-${color}-900/20 rounded-full`}>
        {icon}
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalExpenses:0,
    monthlyExpenses: 0,
    averageExpense:0,
    topCategory: '',
    budgetStatus: 'good',
    budgetTotal:0,
    budgetUsed:0
  });
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
   
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [expensesRes, analyticsRes, budgetsRes] = await Promise.all([
        api.get('/expenses?limit=5'),
        api.get('/expenses/analytics?period=monthly'),
        api.get('/budget')
      ]);

      const expenses = expensesRes.data;
      const analytics = analyticsRes.data;
      const budgets = budgetsRes.data;

      const currentMonth = new Date().toISOString().slice(0, 7);
      const monthlyExpenses = expenses
        .filter((expense: any) => expense.date.startsWith(currentMonth))
        .reduce((sum: number, expense: any) => sum + Number(expense.amount), 0);


      const totalBudget = budgets.reduce((sum: number, budget: any) => sum + Number(budget.amount), 0);
      const budgetUsed = monthlyExpenses;
      const budgetPercentage = totalBudget > 0 ? (budgetUsed / totalBudget) * 100 : 0;

      let budgetStatus: 'good' | 'warning' | 'danger' = 'good';
      if (budgetPercentage > 90) budgetStatus = 'danger';
      else if (budgetPercentage > 75) budgetStatus = 'warning';

      setStats({
        totalExpenses: analytics.total,
        monthlyExpenses,
        averageExpense: expenses.length > 0 ? analytics.total / expenses.length : 0,
        topCategory: analytics.topCategories[0]?.[0] || 'None',
        budgetUsed,
        budgetStatus,
        budgetTotal: totalBudget
      });

      setRecentExpenses(expenses.slice(0, 5));
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
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
    {/* Header */}
    <div className="text-center sm:text-left">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
        Overview of your financial activity
      </p>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Expenses */}
      <StatCard
        title="Total Expenses"
        value={formatCurrency(stats.totalExpenses || 0)}
        icon={<DollarSign className="text-red-600 dark:text-red-400" size={24} />}
        color="red"
      />

      {/* Monthly */}
      <StatCard
        title="This Month"
        value={formatCurrency(stats.monthlyExpenses || 0)}
        icon={<Calendar className="text-orange-600 dark:text-orange-400" size={24} />}
        color="orange"
      />

      {/* Average */}
      <StatCard
        title="Average Expense"
        value={formatCurrency(stats.averageExpense || 0)}
        icon={<TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />}
        color="blue"
      />

      {/* Top Category */}
      <StatCard
        title="Top Category"
        value={stats.topCategory || 'None'}
        icon={<PieChart className="text-purple-600 dark:text-purple-400" size={24} />}
        color="purple"
      />
    </div>

    {/* Budget Section */}
    {stats.budgetTotal > 0 && (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {stats.budgetStatus === 'good' && <CheckCircle className="text-green-500" size={24} />}
            {stats.budgetStatus === 'warning' && <AlertTriangle className="text-yellow-500" size={24} />}
            {stats.budgetStatus === 'danger' && <AlertTriangle className="text-red-500" size={24} />}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Budget</h3>
          </div>

          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {((stats.budgetUsed / stats.budgetTotal) * 100).toFixed(1)}% used
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {formatCurrency(stats.budgetUsed)} of {formatCurrency(stats.budgetTotal)}
            </span>
            <span
              className={`font-medium ${
                stats.budgetStatus === 'good'
                  ? 'text-green-600'
                  : stats.budgetStatus === 'warning'
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}
            >
              {((stats.budgetUsed / stats.budgetTotal) * 100).toFixed(1)}%
            </span>
          </div>

          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                stats.budgetStatus === 'good'
                  ? 'bg-green-500'
                  : stats.budgetStatus === 'warning'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{
                width: `${Math.min((stats.budgetUsed / stats.budgetTotal) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    )}

    {/* Recent Expenses */}
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center sm:text-left">
          Recent Expenses
        </h3>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {recentExpenses.length > 0 ? (
          recentExpenses.map((expense: any) => (
            <div
              key={expense.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1 min-w-0 text-center sm:text-left">
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