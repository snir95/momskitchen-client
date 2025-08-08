export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
}

class UserService {
  private static currentUser: User | null = null;

  static async me(): Promise<User | null> {
    // For now, return a mock admin user
    // In a real app, this would check localStorage or make an API call
    const storedUser = localStorage.getItem('moroccan_user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      return this.currentUser;
    }
    
    // Mock admin user for development
    const mockUser: User = {
      id: '1',
      name: 'עליזה',
      email: 'aliza@moroccan-kitchen.com',
      role: 'admin',
      phone: '050-123-4567'
    };
    
    this.currentUser = mockUser;
    localStorage.setItem('moroccan_user', JSON.stringify(mockUser));
    return mockUser;
  }

  static async login(email: string, password: string): Promise<User> {
    // Mock login - in real app this would be an API call
    if (email === 'admin@moroccan-kitchen.com' && password === 'admin123') {
      const user: User = {
        id: '1',
        name: 'עליזה',
        email: 'aliza@moroccan-kitchen.com',
        role: 'admin',
        phone: '050-123-4567'
      };
      
      this.currentUser = user;
      localStorage.setItem('moroccan_user', JSON.stringify(user));
      return user;
    }
    
    throw new Error('Invalid credentials');
  }

  static async logout(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('moroccan_user');
  }

  static getCurrentUser(): User | null {
    return this.currentUser;
  }

  static isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }
}

export default UserService;
