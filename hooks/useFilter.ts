import { useState, useMemo } from 'react';

interface UseFilterProps<T> {
  items: T[];
  filterFn: (item: T, filters: any) => boolean;
}

export function useFilter<T>({ items, filterFn }: UseFilterProps<T>) {
  const [filters, setFilters] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter(item => filterFn(item, { ...filters, searchTerm }));
  }, [items, filters, searchTerm, filterFn]);

  const updateFilter = (key: string, value: any) => {
    setFilters((prev:any) => ({ ...prev, [key]: value }));
  };

  return {
    filters,
    searchTerm,
    setSearchTerm,
    updateFilter,
    filteredItems,
  };
}