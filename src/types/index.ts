export interface Expense {
  id: string;
  amount: number;
  description: string;
  categoryId: string;
  date: string;
  createdAt: string;
  note?: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

export interface ExpenseFormData {
  amount: string;
  description: string;
  category: string;
  date: string;
}

export interface CategorySummary {
  category: string;
  amount: number;
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