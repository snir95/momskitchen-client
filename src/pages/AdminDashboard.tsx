import React, { useState } from 'react';
import { useMenu } from '@/contexts/MenuContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { MenuItem } from '@/types';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

export default function AdminDashboard() {
  const { items, refreshMenu } = useMenu();
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'main',
    image_url: '',
    available: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/dishes`, {
        ...newItem,
        price: parseFloat(newItem.price)
      });
      await refreshMenu();
      setNewItem({
        name: '',
        description: '',
        price: '',
        category: 'main',
        image_url: '',
        available: true
      });
    } catch (error) {
      console.error('Error creating dish:', error);
    }
  };

  const toggleAvailability = async (item: MenuItem) => {
    try {
      await axios.put(`${API_BASE_URL}/dishes/${item._id}`, {
        ...item,
        available: !item.available
      });
      await refreshMenu();
    } catch (error) {
      console.error('Error updating dish:', error);
    }
  };

  const deleteDish = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/dishes/${id}`);
      await refreshMenu();
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">ניהול תפריט</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">הוספת מנה חדשה</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">שם המנה</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">תיאור</Label>
                <Input
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="price">מחיר</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.1"
                  value={newItem.price}
                  onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">קטגוריה</Label>
                <select
                  id="category"
                  value={newItem.category}
                  onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="appetizer">מנה ראשונה</option>
                  <option value="main">מנה עיקרית</option>
                  <option value="dessert">קינוח</option>
                  <option value="beverage">שתיה</option>
                </select>
              </div>

              <div>
                <Label htmlFor="image_url">קישור לתמונה</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={newItem.image_url}
                  onChange={(e) => setNewItem(prev => ({ ...prev, image_url: e.target.value }))}
                />
              </div>

              <Button type="submit" className="w-full">
                הוסף מנה
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">מנות קיימות</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">₪{item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={item.available ? 'default' : 'outline'}
                      onClick={() => toggleAvailability(item)}
                    >
                      {item.available ? 'זמין' : 'לא זמין'}
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-600"
                      onClick={() => deleteDish(item._id)}
                    >
                      מחק
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}