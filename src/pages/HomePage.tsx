import { useMenu } from '@/contexts/MenuContext';
import { MenuList } from '@/components/menu/MenuList';
import { ChefHat, Star } from 'lucide-react';

export default function HomePage() {
  const { items, loading, error } = useMenu();

  // Test div to verify Tailwind is working
  const testDiv = (
    <div className="bg-red-500 text-white p-4 m-4 rounded-lg">
      Test: Tailwind should make this red with white text
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {testDiv}
        <div className="flex items-center justify-center space-x-2 space-x-reverse">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-moroccan-gold"></div>
          <span className="text-moroccan-dark text-lg">טוען...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        {testDiv}
        <div className="text-center text-moroccan-red bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-lg font-semibold">שגיאה בטעינת התפריט</p>
          <p className="text-sm text-gray-600 mt-2">אנא נסה שוב מאוחר יותר</p>
        </div>
      </div>
    );
  }

  const availableItems = items.filter(item => item.available);
  const unavailableItems = items.filter(item => !item.available);

  return (
    <div className="container mx-auto px-4 py-8">
      {testDiv}
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
          <ChefHat className="h-8 w-8 text-moroccan-gold" />
          <h1 className="text-5xl font-bold text-moroccan-dark">
            התפריט שלנו
          </h1>
        </div>
        <p className="text-xl text-moroccan-gold mb-6">גלה את הטעמים האותנטיים של המטבח המרוקאי</p>
        <div className="flex items-center justify-center space-x-1 space-x-reverse">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
          ))}
          <span className="text-sm text-moroccan-dark mr-2">4.9/5</span>
        </div>
      </div>

      {/* Available Items */}
      {availableItems.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center space-x-2 space-x-reverse mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-moroccan-gold to-moroccan-red rounded-full"></div>
            <h2 className="text-3xl font-bold text-moroccan-dark">המנות שלנו</h2>
          </div>
          <MenuList
            title=""
            items={availableItems}
          />
        </div>
      )}

      {/* Upcoming Items */}
      {unavailableItems.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center space-x-2 space-x-reverse mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-moroccan-red to-moroccan-dark rounded-full"></div>
            <h2 className="text-3xl font-bold text-moroccan-dark">בקרוב במטבח</h2>
          </div>
          <MenuList
            title=""
            items={unavailableItems}
          />
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center mt-16 p-8 bg-gradient-to-r from-moroccan-cream to-orange-50 rounded-2xl border border-moroccan-gold">
        <h3 className="text-2xl font-bold text-moroccan-dark mb-4">רוצה להזמין?</h3>
        <p className="text-moroccan-gold mb-6">הוסף מנות לעגלת הקניות ותיהנה מטעמים אותנטיים</p>
        <div className="flex items-center justify-center space-x-2 space-x-reverse">
          <ChefHat className="h-6 w-6 text-moroccan-gold" />
          <span className="text-moroccan-dark font-semibold">המטבח של עליזה - אוכל ביתי עם אהבה</span>
        </div>
      </div>
    </div>
  );
}