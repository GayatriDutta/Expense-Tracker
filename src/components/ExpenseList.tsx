import React, { useState, useEffect } from "react";
import { BarChart3, Trash2 } from "lucide-react";
import Charts from "../components/Charts";
import Summary from "../components/Summary";
import Filters from "../components/Filters";
import type { Category, Expense } from "../types";
import { deleteExpense, getAllCategories, getAllExpenses } from "../api/service.api";
import { formatCurrency } from "../utils";
import { showError } from "../utils/toast";

const Analytics: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [expenses, searchTerm, selectedCategory, startDate, endDate]);

  const fetchData = async () => {
    try {
      const [expensesData, categoriesData] = await Promise.all([
        getAllExpenses(),
        getAllCategories(),
      ]);
      setExpenses(expensesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...expenses];

    if (searchTerm) {
      filtered = filtered.filter(
        (expense) =>
          expense.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          expense.note?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory != "all") {
      filtered = filtered.filter(
        (expense) => expense.categoryId == selectedCategory
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter((expense) => {
        const expenseDate = new Date(expense.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return expenseDate >= start && expenseDate <= end;
      });
    }

    setFilteredExpenses(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setStartDate("");
    setEndDate("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
      if (window.confirm('Are you sure you want to delete this Expense?')) {
        try {
          await deleteExpense(id);
          await fetchData();
        } catch (error) {
          showError(`Failed to delete budget:${error}`);
        }
      }
    };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
          Detailed insights into your spending patterns
        </p>
      </div>

      {/* Filters */}
      <div className="w-full">
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          onClearFilters={clearFilters}
          categories={categories}
        />
      </div>

      {/* Summary */}
      <div className="w-full">
        <Summary expenses={filteredExpenses} />
      </div>

      {/* Charts */}
      <div className="w-full">
        <Charts expenses={filteredExpenses} categories={categories} />
      </div>

      {/* Empty State */}
      {filteredExpenses.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 sm:p-12 text-center border border-gray-200 dark:border-gray-700">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <BarChart3 size={48} className="mx-auto" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
            No expenses found
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
            Try adjusting your filters or add some expenses to see analytics
          </p>
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center sm:text-left">
            Expenses List
          </h3>
        </div>

        <div className="divide-y  divide-gray-200 dark:divide-gray-700">
          {filteredExpenses.length > 0 &&
            filteredExpenses.map((expense: any) => (
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
                      {expense.category?.name} •{" "}
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                      onClick={() => handleDelete(expense.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                    -{formatCurrency(expense.amount)}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
