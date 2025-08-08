import React, { createContext, useContext, useState, useEffect } from 'react';
import type { MenuItem, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  total: number;
  itemCount: number;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'moroccan_cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setItems(parsedCart);
      updateTotals(parsedCart);
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const updateTotals = (currentItems: CartItem[]) => {
    setTotal(currentItems.reduce((sum, item) => sum + (item.price * item.quantity), 0));
    setItemCount(currentItems.reduce((sum, item) => sum + item.quantity, 0));
  };

  const addToCart = (menuItem: MenuItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item._id === menuItem._id);
      
      let newItems;
      if (existingItem) {
        newItems = currentItems.map(item =>
          item._id === menuItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...currentItems, {
          _id: menuItem._id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1
        }];
      }
      
      updateTotals(newItems);
      return newItems;
    });
  };

  const removeFromCart = (id: string) => {
    setItems(currentItems => {
      const newItems = currentItems.filter(item => item._id !== id);
      updateTotals(newItems);
      return newItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(currentItems => {
      if (quantity <= 0) {
        const newItems = currentItems.filter(item => item._id !== id);
        updateTotals(newItems);
        return newItems;
      }

      const newItems = currentItems.map(item =>
        item._id === id ? { ...item, quantity } : item
      );
      updateTotals(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    setTotal(0);
    setItemCount(0);
  };

  const value = {
    items,
    total,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}