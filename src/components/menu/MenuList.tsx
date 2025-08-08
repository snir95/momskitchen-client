import React from 'react';
import { MenuCard } from './MenuCard';
import type { MenuItem } from '@/types';

interface MenuListProps {
  items: MenuItem[];
  title: string;
}

export function MenuList({ items, title }: MenuListProps) {
  if (items.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <MenuCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}


