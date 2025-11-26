import {
  formatCurrency,
  formatPrice,
  parseCurrency,
  convertCurrency
} from '../utils/currency';

describe('Currency Utilities', () => {
  describe('formatCurrency', () => {
    it('should format currency with default USD', () => {
      expect(formatCurrency(1000)).toBe('$1,000.00');
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('should handle different currencies', () => {
      expect(formatCurrency(1000, 'EUR')).toContain('1,000');
      expect(formatCurrency(1000, 'GBP')).toContain('1,000');
    });

    it('should handle negative amounts', () => {
      const result = formatCurrency(-500);
      expect(result).toContain('500');
    });

    it('should handle large numbers', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
      expect(formatCurrency(1234567.89)).toBe('$1,234,567.89');
    });
  });

  describe('formatPrice', () => {
    it('should format price without decimals for whole numbers', () => {
      expect(formatPrice(1000)).toBe('$1,000');
      expect(formatPrice(500)).toBe('$500');
    });

    it('should include decimals when needed', () => {
      expect(formatPrice(1234.56)).toBe('$1,234.56');
      expect(formatPrice(99.99)).toBe('$99.99');
    });

    it('should handle zero', () => {
      expect(formatPrice(0)).toBe('$0');
    });
  });

  describe('parseCurrency', () => {
    it('should parse formatted currency strings', () => {
      expect(parseCurrency('$1,000.00')).toBe(1000);
      expect(parseCurrency('$1,234.56')).toBe(1234.56);
      expect(parseCurrency('$500')).toBe(500);
    });

    it('should handle strings without currency symbol', () => {
      expect(parseCurrency('1000')).toBe(1000);
      expect(parseCurrency('1,234.56')).toBe(1234.56);
    });

    it('should handle invalid inputs', () => {
      expect(parseCurrency('invalid')).toBe(0);
      expect(parseCurrency('')).toBe(0);
    });

    it('should handle negative values', () => {
      expect(parseCurrency('-$500')).toBe(-500);
      expect(parseCurrency('$-500')).toBe(-500);
    });
  });

  describe('convertCurrency', () => {
    it('should convert currency with given exchange rate', () => {
      expect(convertCurrency(100, 1.2)).toBe(120);
      expect(convertCurrency(50, 0.8)).toBe(40);
    });

    it('should round to 2 decimal places', () => {
      expect(convertCurrency(100, 1.234567)).toBe(123.46);
      expect(convertCurrency(33.33, 3)).toBe(99.99);
    });

    it('should handle rate of 1', () => {
      expect(convertCurrency(100, 1)).toBe(100);
    });

    it('should handle zero amount', () => {
      expect(convertCurrency(0, 1.5)).toBe(0);
    });
  });
});
