import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('moroccan_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // For development, set a mock admin user
      const mockUser: User = {
        id: '1',
        name: 'עליזה',
        email: 'aliza@moroccan-kitchen.com',
        role: 'admin',
        phone: '050-123-4567'
      };
      setUser(mockUser);
      localStorage.setItem('moroccan_user', JSON.stringify(mockUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock login logic - replace with actual API call later
      if (email === 'admin@moroccan-kitchen.com' && password === 'admin123') {
        const user: User = {
          id: '1',
          name: 'עליזה',
          email: 'aliza@moroccan-kitchen.com',
          role: 'admin',
          phone: '050-123-4567'
        };
        setUser(user);
        localStorage.setItem('moroccan_user', JSON.stringify(user));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('moroccan_user');
  };

  const isAdmin = () => user?.role === 'admin';

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAdmin,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
