import { Button } from '@/components/ui/button';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-center bg-muted/30 p-6 rounded-2xl">
      <Button
        variant={selectedCategory === 'all' ? 'default' : 'outline'}
        onClick={() => onCategoryChange('all')}
        className="rounded-full"
        size="sm"
      >
        All Posts
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          onClick={() => onCategoryChange(category)}
          className="rounded-full"
          size="sm"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}