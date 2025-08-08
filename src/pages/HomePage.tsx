import React from 'react';
import { useMenu } from '@/contexts/MenuContext';
import { MenuList } from '@/components/menu/MenuList';

export default function HomePage() {
  const { items, loading, error } = useMenu();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">טוען...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">שגיאה בטעינת התפריט</div>
      </div>
    );
  }

  const availableItems = items.filter(item => item.available);
  const unavailableItems = items.filter(item => !item.available);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        התפריט שלנו
            </h1>

      <MenuList
        title="המנות שלנו"
        items={availableItems}
      />

      {unavailableItems.length > 0 && (
        <MenuList
          title="בקרוב במטבח"
          items={unavailableItems}
        />
      )}
    </div>
  );
}