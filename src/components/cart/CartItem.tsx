import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Trash2 } from 'lucide-react';

export default function CartItem({ item, onUpdateQuantity, onRemoveItem }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-orange-100">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{item.name}</h4>
        <p className="text-sm text-gray-600">₪{item.price.toFixed(2)} ליחידה</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-orange-50 rounded-full p-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full hover:bg-red-100 text-red-600"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full hover:bg-green-100 text-green-600"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-left w-20">
          <p className="font-semibold text-lg">₪{(item.price * item.quantity).toFixed(2)}</p>
        </div>
        
        <Button
          size="icon"
          variant="ghost"
          className="text-red-500 hover:bg-red-50"
          onClick={() => onRemoveItem(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}