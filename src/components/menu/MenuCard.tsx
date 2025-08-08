import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import type { MenuItem } from '@/types';
import { useCart } from '@/contexts/CartContext';

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const { items: cartItems, addToCart, updateQuantity } = useCart();
  const quantity = cartItems.find(cartItem => cartItem._id === item._id)?.quantity || 0;

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 0) return;
    updateQuantity(item._id, newQuantity);
  };

  const categoryTranslations = {
    appetizer: 'מנה ראשונה',
    main: 'מנה עיקרית',
    dessert: 'קינוח',
    beverage: 'שתיה'
  };

  return (
    <Card className="h-full overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative">
        {item.image_url && (
          <div className="h-48 overflow-hidden">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 text-sm rounded-full bg-orange-100 text-orange-800">
            {categoryTranslations[item.category]}
          </span>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{item.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-600">
            ₪{item.price.toFixed(2)}
          </span>

          <div className="flex items-center gap-2">
            {quantity > 0 ? (
              <div className="flex items-center gap-2 bg-orange-50 rounded-full p-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full hover:bg-red-100 text-red-600"
                  onClick={() => handleUpdateQuantity(quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full hover:bg-green-100 text-green-600"
                  onClick={() => handleUpdateQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleAddToCart}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                disabled={!item.available}
              >
                <Plus className="h-4 w-4 ml-1" />
                הוספה
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}