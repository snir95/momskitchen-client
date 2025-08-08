export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'appetizer' | 'main' | 'dessert' | 'beverage';
  image_url?: string;
  available: boolean;
  ingredients?: string;
  spice_level: 'mild' | 'medium' | 'spicy';
  createdAt: string;
  updatedAt: string;
}

export interface MenuItemInput extends Omit<MenuItem, '_id' | 'createdAt' | 'updatedAt'> {}


