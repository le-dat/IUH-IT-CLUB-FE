import { vi } from '@/lib/translations';

export function useTranslation() {
  // For now, we'll just return Vietnamese translations
  // In the future, this can be expanded to support multiple languages
  return {
    t: (path: string) => {
      return path.split('.').reduce((obj, key) => obj[key], vi as any) || path;
    },
  };
}