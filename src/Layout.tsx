import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChefHat } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { itemCount } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-moroccan-cream to-orange-50" dir="rtl">
      <header className="bg-white shadow-lg border-b-4 border-moroccan-gold">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-3 space-x-reverse group">
              <div className="w-12 h-12 bg-gradient-to-br from-moroccan-gold to-moroccan-red rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <ChefHat className="text-white h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-moroccan-dark">
                  המטבח של עליזה
                </h1>
                <p className="text-sm text-moroccan-gold">אוכל ביתי אותנטי</p>
              </div>
            </Link>

            <nav className="flex items-center space-x-4 space-x-reverse">
              <Link to="/">
                <Button
                  variant={isActive('/') ? 'default' : 'ghost'}
                  className={isActive('/') ? 'bg-moroccan-gold hover:bg-moroccan-dark text-white' : 'text-moroccan-dark hover:bg-moroccan-cream'}
                >
                  תפריט
                </Button>
              </Link>
              <Link to="/admin">
                <Button
                  variant={isActive('/admin') ? 'default' : 'ghost'}
                  className={isActive('/admin') ? 'bg-moroccan-gold hover:bg-moroccan-dark text-white' : 'text-moroccan-dark hover:bg-moroccan-cream'}
                >
                  ניהול
                </Button>
              </Link>
              <Link to="/cart">
                <Button
                  variant={isActive('/cart') ? 'default' : 'ghost'}
                  className={`relative ${isActive('/cart') ? 'bg-moroccan-gold hover:bg-moroccan-dark text-white' : 'text-moroccan-dark hover:bg-moroccan-cream'}`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-moroccan-red text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
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

      <footer className="bg-gradient-to-r from-moroccan-dark to-moroccan-red text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
              <ChefHat className="h-6 w-6 text-moroccan-gold" />
              <h3 className="text-xl font-bold">המטבח של עליזה</h3>
            </div>
            <p className="text-moroccan-cream mb-2">אוכל ביתי אותנטי עם אהבה</p>
            <p className="text-sm text-moroccan-gold">
              © {new Date().getFullYear()} כל הזכויות שמורות
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}