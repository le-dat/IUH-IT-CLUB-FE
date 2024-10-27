import { format, addDays, isBefore, isAfter } from 'date-fns';
import { vi } from 'date-fns/locale';

export function formatDate(date: Date | string): string {
  return format(new Date(date), 'dd/MM/yyyy', { locale: vi });
}

export function formatDateTime(date: Date | string): string {
  return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi });
}

export function validateDateRange(startDate: string, endDate: string, maxDays: number): string[] {
  const errors: string[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const maxEnd = addDays(start, maxDays);

  if (isBefore(end, start)) {
    errors.push('validation.endDateBeforeStart');
  }

  if (isAfter(end, maxEnd)) {
    errors.push('validation.maxBorrowPeriod');
  }

  return errors;
}