import {
  formatDate,
  formatDateRange,
  formatRelativeTime,
  isDateInFuture,
  isDateInPast,
  getDaysDifference
} from '../utils/dateFormat';

describe('Date Formatting Utilities', () => {
  const mockDate = new Date('2025-01-15T12:00:00Z');

  describe('formatDate', () => {
    it('should format date in default format', () => {
      const result = formatDate('2025-01-15');
      expect(result).toMatch(/Jan(uary)? 15, 2025/);
    });

    it('should handle Date objects', () => {
      const result = formatDate(mockDate);
      expect(result).toMatch(/Jan(uary)? 15, 2025/);
    });

    it('should handle invalid dates', () => {
      const result = formatDate('invalid-date');
      expect(result).toBe('Invalid Date');
    });
  });

  describe('formatDateRange', () => {
    it('should format date range correctly', () => {
      const start = '2025-01-15';
      const end = '2025-01-20';
      const result = formatDateRange(start, end);
      expect(result).toContain('15');
      expect(result).toContain('20');
      expect(result).toContain('-');
    });

    it('should handle same date range', () => {
      const date = '2025-01-15';
      const result = formatDateRange(date, date);
      expect(result).toBeTruthy();
    });
  });

  describe('formatRelativeTime', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2025-01-15T12:00:00Z'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should format recent times', () => {
      const oneMinuteAgo = new Date('2025-01-15T11:59:00Z');
      const result = formatRelativeTime(oneMinuteAgo);
      expect(result).toContain('minute');
    });

    it('should format hours ago', () => {
      const twoHoursAgo = new Date('2025-01-15T10:00:00Z');
      const result = formatRelativeTime(twoHoursAgo);
      expect(result).toContain('hour');
    });

    it('should format days ago', () => {
      const twoDaysAgo = new Date('2025-01-13T12:00:00Z');
      const result = formatRelativeTime(twoDaysAgo);
      expect(result).toContain('day');
    });
  });

  describe('isDateInFuture', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2025-01-15T12:00:00Z'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should identify future dates', () => {
      const futureDate = new Date('2025-01-20T12:00:00Z');
      expect(isDateInFuture(futureDate)).toBe(true);
    });

    it('should identify past dates', () => {
      const pastDate = new Date('2025-01-10T12:00:00Z');
      expect(isDateInFuture(pastDate)).toBe(false);
    });

    it('should handle string dates', () => {
      expect(isDateInFuture('2025-01-20')).toBe(true);
      expect(isDateInFuture('2025-01-10')).toBe(false);
    });
  });

  describe('isDateInPast', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2025-01-15T12:00:00Z'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should identify past dates', () => {
      const pastDate = new Date('2025-01-10T12:00:00Z');
      expect(isDateInPast(pastDate)).toBe(true);
    });

    it('should identify future dates', () => {
      const futureDate = new Date('2025-01-20T12:00:00Z');
      expect(isDateInPast(futureDate)).toBe(false);
    });
  });

  describe('getDaysDifference', () => {
    it('should calculate positive day difference', () => {
      const date1 = new Date('2025-01-15');
      const date2 = new Date('2025-01-20');
      expect(getDaysDifference(date1, date2)).toBe(5);
    });

    it('should calculate negative day difference', () => {
      const date1 = new Date('2025-01-20');
      const date2 = new Date('2025-01-15');
      expect(getDaysDifference(date1, date2)).toBe(-5);
    });

    it('should return 0 for same date', () => {
      const date = new Date('2025-01-15');
      expect(getDaysDifference(date, date)).toBe(0);
    });

    it('should handle string dates', () => {
      expect(getDaysDifference('2025-01-15', '2025-01-20')).toBe(5);
    });
  });
});
