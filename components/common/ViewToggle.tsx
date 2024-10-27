import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ViewToggleProps {
  viewMode: 'grid' | 'table';
  onToggle: () => void;
}

export default function ViewToggle({ viewMode, onToggle }: ViewToggleProps) {
  const { t } = useTranslation();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      title={t('common.toggleView')}
    >
      {viewMode === 'grid' ? (
        <List className="h-4 w-4" />
      ) : (
        <Grid className="h-4 w-4" />
      )}
    </Button>
  );
}