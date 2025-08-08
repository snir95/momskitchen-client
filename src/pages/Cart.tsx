import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Minus, Plus, Trash2, ShoppingCart, User, Phone, Mail, MapPin } from 'lucide-react';

export default function Cart() {
  const { items, total, updateQuantity, removeFromCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement order submission
    console.log('Order:', { customerInfo, items, total });
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <ShoppingCart className="h-12 w-12 text-moroccan-gold" />
          </div>
          <h2 className="text-2xl font-bold text-moroccan-dark mb-2">העגלה שלך ריקה</h2>
          <p className="text-moroccan-gold mb-6">הוסף מנות מהתפריט כדי להתחיל</p>
          <Button className="bg-gradient-to-r from-moroccan-gold to-moroccan-red hover:from-moroccan-dark hover:to-moroccan-red text-white">
            חזור לתפריט
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
          <ShoppingCart className="h-8 w-8 text-moroccan-gold" />
          <h1 className="text-4xl font-bold text-moroccan-dark">העגלה שלך</h1>
        </div>
        <p className="text-moroccan-gold">השלם את הפרטים כדי להזמין</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cart Items */}
        <div>
          <Card className="border-2 border-moroccan-gold shadow-lg">
            <CardHeader className="bg-gradient-to-r from-moroccan-cream to-orange-50">
              <h2 className="text-2xl font-bold text-moroccan-dark flex items-center space-x-2 space-x-reverse">
                <ShoppingCart className="h-6 w-6" />
                <span>פריטים בעגלה</span>
              </h2>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-moroccan-gold transition-colors bg-white">
                    <div className="flex-1">
                      <h3 className="font-bold text-moroccan-dark text-lg">{item.name}</h3>
                      <p className="text-moroccan-gold font-semibold">₪{item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-gradient-to-r from-moroccan-cream to-orange-50 rounded-full p-2 border border-moroccan-gold">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-bold text-moroccan-dark">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-full hover:bg-green-100 text-green-600 transition-colors"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-moroccan-red hover:bg-red-50 transition-colors"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-moroccan-gold to-moroccan-red rounded-lg">
                <div className="flex items-center justify-between text-white">
                  <span className="text-xl font-bold">סה"כ לתשלום:</span>
                  <span className="text-2xl font-bold">₪{total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Form */}
        <div>
          <Card className="border-2 border-moroccan-gold shadow-lg">
            <CardHeader className="bg-gradient-to-r from-moroccan-cream to-orange-50">
              <h2 className="text-2xl font-bold text-moroccan-dark flex items-center space-x-2 space-x-reverse">
                <User className="h-6 w-6" />
                <span>פרטי הזמנה</span>
              </h2>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-moroccan-dark font-semibold flex items-center space-x-2 space-x-reverse">
                    <User className="h-4 w-4" />
                    <span>שם מלא</span>
                  </Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="border-2 border-gray-300 focus:border-moroccan-gold transition-colors"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-moroccan-dark font-semibold flex items-center space-x-2 space-x-reverse">
                    <Phone className="h-4 w-4" />
                    <span>טלפון</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="border-2 border-gray-300 focus:border-moroccan-gold transition-colors"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-moroccan-dark font-semibold flex items-center space-x-2 space-x-reverse">
                    <Mail className="h-4 w-4" />
                    <span>אימייל</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="border-2 border-gray-300 focus:border-moroccan-gold transition-colors"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-moroccan-dark font-semibold flex items-center space-x-2 space-x-reverse">
                    <MapPin className="h-4 w-4" />
                    <span>כתובת למשלוח</span>
                  </Label>
                  <Input
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                    className="border-2 border-gray-300 focus:border-moroccan-gold transition-colors"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-moroccan-gold to-moroccan-red hover:from-moroccan-dark hover:to-moroccan-red text-white font-bold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  שלח הזמנה
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}