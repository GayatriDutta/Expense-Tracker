import { format, isWithinInterval, parseISO } from 'date-fns';
import type { Expense, CategorySummary, MonthlySummary } from '../types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return format(parseISO(dateString), 'MMM dd, yyyy');
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const getCategorySummary = (expenses: Expense[]): CategorySummary[] => {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.categoryId] = (acc[expense.categoryId] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  return Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    total: amount,
    count: expenses.filter(e => e.categoryId === category).length,
    percentage: total > 0 ? (total / total) * 100 : 0,
  }));
};

export const getMonthlySummary = (expenses: Expense[]): MonthlySummary[] => {
  const monthlyTotals = expenses.reduce((acc, expense) => {
    const month = format(parseISO(expense.date), 'yyyy-MM');
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(monthlyTotals)
    .map(([month, total]) => ({
      month: format(parseISO(`${month}-01`), 'MMM yyyy'),
      total,
      count: expenses.filter(e => format(parseISO(e.date), 'yyyy-MM') === month).length,
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
};

export const filterExpensesByDateRange = (
  expenses: Expense[],
  startDate?: string,
  endDate?: string
): Expense[] => {
  if (!startDate && !endDate) return expenses;
  
  return expenses.filter(expense => {
    const expenseDate = parseISO(expense.date);
    const start = startDate ? parseISO(startDate) : new Date(0);
    const end = endDate ? parseISO(endDate) : new Date();
    
    return isWithinInterval(expenseDate, { start, end });
  });
};

export const getTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
};