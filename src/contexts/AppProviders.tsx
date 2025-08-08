import React from 'react';
import { UserProvider } from './UserContext';
import { MenuProvider } from './MenuContext';
import { CartProvider } from './CartContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <MenuProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </MenuProvider>
    </UserProvider>
  );
}
