import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Star } from 'lucide-react';
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

  const categoryColors = {
    appetizer: 'bg-green-100 text-green-800',
    main: 'bg-moroccan-gold text-white',
    dessert: 'bg-pink-100 text-pink-800',
    beverage: 'bg-blue-100 text-blue-800'
  };

  return (
    <Card className="h-full overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-moroccan-gold group">
      <div className="relative">
        {item.image_url && (
          <div className="h-48 overflow-hidden">
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-sm rounded-full font-semibold shadow-md ${categoryColors[item.category]}`}>
            {categoryTranslations[item.category]}
          </span>
        </div>
        {!item.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg bg-moroccan-red px-4 py-2 rounded-lg">
              בקרוב
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-moroccan-dark group-hover:text-moroccan-gold transition-colors">
              {item.name}
            </h3>
            <div className="flex items-center space-x-1 space-x-reverse">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-moroccan-gold font-semibold">4.8</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="text-3xl font-bold text-moroccan-gold">
              ₪{item.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {quantity > 0 ? (
              <div className="flex items-center gap-2 bg-gradient-to-r from-moroccan-cream to-orange-50 rounded-full p-2 border border-moroccan-gold">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                  onClick={() => handleUpdateQuantity(quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-bold text-moroccan-dark">{quantity}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full hover:bg-green-100 text-green-600 transition-colors"
                  onClick={() => handleUpdateQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-moroccan-gold to-moroccan-red hover:from-moroccan-dark hover:to-moroccan-red text-white rounded-full px-6 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!item.available}
              >
                <Plus className="h-4 w-4 ml-2" />
                הוספה
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}