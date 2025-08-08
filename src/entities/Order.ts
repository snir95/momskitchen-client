export interface OrderItem {
  menu_item_id: string;
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
  items: OrderItem[];
  total_amount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  order_type: 'delivery' | 'pickup';
  special_instructions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderInput extends Omit<Order, '_id' | 'createdAt' | 'updatedAt'> {}


