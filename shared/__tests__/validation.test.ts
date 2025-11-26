import {
  isValidEmail,
  isValidPhone,
  isValidPrice,
  hasMinLength,
  isInRange
} from '../utils/validation';

describe('Validation Utilities', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('first+last@example.com')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('test @example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('should validate correct phone numbers', () => {
      expect(isValidPhone('+1234567890')).toBe(true);
      expect(isValidPhone('123-456-7890')).toBe(true);
      expect(isValidPhone('(123) 456-7890')).toBe(true);
      expect(isValidPhone('1234567890')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(isValidPhone('123')).toBe(false); // Too short
      expect(isValidPhone('abc123')).toBe(false); // Contains letters
      expect(isValidPhone('')).toBe(false);
    });

    it('should require at least 10 digits', () => {
      expect(isValidPhone('123456789')).toBe(false); // Only 9 digits
      expect(isValidPhone('1234567890')).toBe(true); // Exactly 10 digits
      expect(isValidPhone('+1 (234) 567-8901')).toBe(true); // 11 digits with formatting
    });
  });

  describe('isValidPrice', () => {
    it('should validate positive finite numbers', () => {
      expect(isValidPrice(100)).toBe(true);
      expect(isValidPrice(0.01)).toBe(true);
      expect(isValidPrice(999999.99)).toBe(true);
    });

    it('should reject invalid prices', () => {
      expect(isValidPrice(0)).toBe(false);
      expect(isValidPrice(-100)).toBe(false);
      expect(isValidPrice(Infinity)).toBe(false);
      expect(isValidPrice(-Infinity)).toBe(false);
      expect(isValidPrice(NaN)).toBe(false);
    });
  });

  describe('hasMinLength', () => {
    it('should validate strings meeting minimum length', () => {
      expect(hasMinLength('hello', 5)).toBe(true);
      expect(hasMinLength('hello world', 5)).toBe(true);
      expect(hasMinLength('test', 4)).toBe(true);
    });

    it('should reject strings below minimum length', () => {
      expect(hasMinLength('hi', 5)).toBe(false);
      expect(hasMinLength('', 1)).toBe(false);
    });

    it('should trim whitespace before checking', () => {
      expect(hasMinLength('  hello  ', 5)).toBe(true);
      expect(hasMinLength('  hi  ', 5)).toBe(false);
      expect(hasMinLength('     ', 1)).toBe(false);
    });
  });

  describe('isInRange', () => {
    it('should validate numbers within range', () => {
      expect(isInRange(5, 1, 10)).toBe(true);
      expect(isInRange(1, 1, 10)).toBe(true); // Min boundary
      expect(isInRange(10, 1, 10)).toBe(true); // Max boundary
    });

    it('should reject numbers outside range', () => {
      expect(isInRange(0, 1, 10)).toBe(false);
      expect(isInRange(11, 1, 10)).toBe(false);
      expect(isInRange(-5, 0, 10)).toBe(false);
    });

    it('should handle negative ranges', () => {
      expect(isInRange(-5, -10, 0)).toBe(true);
      expect(isInRange(-11, -10, 0)).toBe(false);
    });
  });
});
