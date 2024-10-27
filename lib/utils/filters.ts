export function createSearchFilter(searchTerm: string, fields: string[]) {
  const term = searchTerm.toLowerCase();
  return (item: any) =>
    fields.some(field => 
      String(item[field]).toLowerCase().includes(term)
    );
}

export function createMultiFilter(filters: Record<string, any>) {
  return (item: any) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value || value === 'all') return true;
      return item[key] === value;
    });
}