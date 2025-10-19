import React from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar } from "react-chartjs-2";

import type { Expense } from '../types';
import { getCategorySummary, getMonthlySummary } from '../utils';
import { getCategoryColor, getCategoryLabel } from '../data/categories';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartsProps {
  expenses: Expense[];
}

const Charts: React.FC<ChartsProps> = ({ expenses }) => {
  const categorySummary = getCategorySummary(expenses);
  const monthlySummary = getMonthlySummary(expenses);

  // Pie Chart Data
  const pieData = {
    labels: categorySummary.map(cat => getCategoryLabel(cat.category)),
    datasets: [
      {
        data: categorySummary.map(cat => cat.amount),
        backgroundColor: categorySummary.map(cat => getCategoryColor(cat.category)),
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = Number(context.raw);
            const percentage = ((value/ expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)) * 100).toFixed(1);
            return `${context.label}: $${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
  };

  // Bar Chart Data
  const barData = {
    labels: monthlySummary.map(month => month.month),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: monthlySummary.map(month => month.total),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const monthData = monthlySummary[context.dataIndex];
            return [
              `Total: $${context.raw.toFixed(2)}`,
              `Transactions: ${monthData.count}`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => `$${value}`,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  if (expenses.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <p className="text-gray-500">No data for category chart</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 text-6xl mb-4">📈</div>
          <p className="text-gray-500">No data for monthly trend</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Expenses by Category
        </h3>
        <div className="h-80">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Monthly Trend
        </h3>
        <div className="h-80">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Charts;