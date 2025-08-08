import { MenuCard } from './MenuCard';
import type { MenuItem } from '@/types';

interface MenuListProps {
  items: MenuItem[];
  title?: string;
}

export function MenuList({ items, title }: MenuListProps) {
  if (items.length === 0) return null;

  return (
    <div className="mb-8">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-moroccan-dark">{title}</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <MenuCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}


