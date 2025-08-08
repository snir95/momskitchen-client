import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { itemCount } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">א</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  המטבח של עליזה
                </h1>
              </div>
            </Link>

            <nav className="flex items-center space-x-4 space-x-reverse">
              <Link to="/">
                <Button
                  variant={isActive('/') ? 'default' : 'ghost'}
                >
                  תפריט
                </Button>
              </Link>
              <Link to="/admin">
                <Button
                  variant={isActive('/admin') ? 'default' : 'ghost'}
                >
                  ניהול
                </Button>
              </Link>
              <Link to="/cart">
                <Button
                  variant={isActive('/cart') ? 'default' : 'ghost'}
                  className="relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-8">
        {children}
      </main>

      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            © {new Date().getFullYear()} המטבח של עליזה. כל הזכויות שמורות.
          </div>
        </div>
      </footer>
    </div>
  );
}