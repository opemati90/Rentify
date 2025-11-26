export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatPrice = (price: number): string => {
  return `$${price.toLocaleString()}`;
};

export const calculateTotal = (price: number, months: number): number => {
  return price * months;
};

export const calculateDeposit = (monthlyRent: number, depositMonths: number = 1): number => {
  return monthlyRent * depositMonths;
};
