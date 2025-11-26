export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatPrice = (price: number): string => {
  // Format without decimals if whole number, with decimals otherwise
  if (Number.isInteger(price)) {
    return `$${price.toLocaleString()}`;
  }
  return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const parseCurrency = (value: string): number => {
  if (!value) return 0;
  // Remove currency symbols, spaces, and commas
  const cleaned = value.replace(/[$,\s]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
};

export const convertCurrency = (amount: number, exchangeRate: number): number => {
  const converted = amount * exchangeRate;
  return Math.round(converted * 100) / 100; // Round to 2 decimal places
};

export const calculateTotal = (price: number, months: number): number => {
  return price * months;
};

export const calculateDeposit = (monthlyRent: number, depositMonths: number = 1): number => {
  return monthlyRent * depositMonths;
};
