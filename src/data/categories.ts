export const EXPENSE_CATEGORIES = [
  { value: 'food', label: 'Food & Dining', color: '#EF4444' },
  { value: 'transportation', label: 'Transportation', color: '#3B82F6' },
  { value: 'shopping', label: 'Shopping', color: '#8B5CF6' },
  { value: 'entertainment', label: 'Entertainment', color: '#F59E0B' },
  { value: 'bills', label: 'Bills & Utilities', color: '#10B981' },
  { value: 'healthcare', label: 'Healthcare', color: '#EC4899' },
  { value: 'education', label: 'Education', color: '#06B6D4' },
  { value: 'travel', label: 'Travel', color: '#84CC16' },
  { value: 'other', label: 'Other', color: '#6B7280' },
];

export const getCategoryColor = (category: string): string => {
  const categoryData = EXPENSE_CATEGORIES.find(cat => cat.value === category);
  return categoryData?.color || '#6B7280';
};

export const getCategoryLabel = (category: string): string => {
  const categoryData = EXPENSE_CATEGORIES.find(cat => cat.value === category);
  return categoryData?.label || category;
};