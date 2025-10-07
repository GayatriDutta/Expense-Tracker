export const EXPENSE_CATEGORIES = [
  { id: 1, value: "food", label: "Food & Dining", icon: "#EF4444" },
  { id: 2, value: "transportation", label: "Transportation", icon: "#3B82F6" },
  { id: 3, value: "shopping", label: "Shopping", icon: "#8B5CF6" },
  { id: 4, value: "entertainment", label: "Entertainment", icon: "#F59E0B" },
  { id: 5, value: "bills", label: "Bills & Utilities", icon: "#10B981" },
  { id: 6, value: "healthcare", label: "Healthcare", icon: "#EC4899" },
  { id: 7, value: "education", label: "Education", icon: "#06B6D4" },
  { id: 8, value: "travel", label: "Travel", icon: "#84CC16" },
  { id: 9, value: "other", label: "Other", icon: "#6B7280" },
];

export const getCategoryColor = (category: string): string => {
  const categoryData = EXPENSE_CATEGORIES.find((cat) => cat.value === category);
  return categoryData?.icon || "#6B7280";
};

export const getCategoryLabel = (category: string): string => {
  const categoryData = EXPENSE_CATEGORIES.find((cat) => cat.value === category);
  return categoryData?.label || category;
};
