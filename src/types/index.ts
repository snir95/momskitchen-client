export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'appetizer' | 'main' | 'dessert' | 'beverage';
  image_url?: string;
  available: boolean;
}

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address?: string;
  items: CartItem[];
  total_amount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  order_type: 'delivery' | 'pickup';
}


