export interface Expense {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  date: string;
  createdAt: string;
}

export interface ExpenseFormData {
  amount: string;
  description: string;
  category: string;
  date: string;
}

export interface CategorySummary {
  category: string;
  total: number;
  count: number;
  percentage: number;
}

export interface MonthlySummary {
  month: string;
  total: number;
  count: number;
}

export interface Budget {
    amount: number;
    month: string;
    categoryId: string ;
    userId: string;
};