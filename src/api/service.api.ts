import type { Expense } from "../types";
import api from "./api";

export const loginAPICall = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const registerAPICall = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await api.post("/users/register", { name, email, password });
  return res.data;
};

export const createExpenseCall = async (
  amount: number,
  description: string,
  note: string,
  categoryId: string,
  date: string,
  user_id: string
) => {
  const res = await api.post("/expenses", {
    amount,
    description,
    note,
    categoryId,
    date,
    user_id,
  });
  return res;
};

export const getAllCategories = async (): Promise<Expense[]> => {
  const res = await api.get(`/categories`);
  return res.data;
}

export const getAllExpenses = async (
  userId: string,
  filters?: {
    categoryId?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
  }
): Promise<Expense[]> => {
  const res = await api.get(`/expenses/${userId}`, { params: filters });
  return res.data;
};

export const getExpenseById = async (
  userId: string,
  id: string
): Promise<Expense> => {
  const res = await api.get(`/expenses/${userId}/${id}`);
  return res.data;
};

export const createExpense = async (
  userId: string,
  expense: Partial<Expense>
): Promise<Expense> => {
  const res = await api.post(`/expenses/${userId}`, expense);
  return res.data;
};

export const updateExpense = async (
  userId: string,
  id: string,
  expense: Partial<Expense>
): Promise<Expense> => {
  const res = await api.patch(`/expenses/${userId}/${id}`, expense);
  return res.data;
};

export const deleteExpense = async (
  userId: string,
  id: string
): Promise<void> => {
  await api.delete(`/expenses/${userId}/${id}`);
};

export const getExpenseAnalytics = async (
  userId: string,
  period: "daily" | "weekly" | "monthly" = "monthly"
) => {
  const res = await api.get(`/expenses/${userId}/analytics`, {
    params: { period },
  });
  return res.data;
};

export const exportExpenses = async (userId: string): Promise<any[]> => {
  const res = await api.get(`/expenses/${userId}/export`);
  return res.data;
};

