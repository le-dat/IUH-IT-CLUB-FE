import { useState } from 'react';

type ViewMode = 'grid' | 'table';

export function useViewMode(defaultMode: ViewMode = 'table') {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultMode);

  const toggleViewMode = () => {
    setViewMode(current => current === 'grid' ? 'table' : 'grid');
  };

  return {
    viewMode,
    toggleViewMode,
  };
}