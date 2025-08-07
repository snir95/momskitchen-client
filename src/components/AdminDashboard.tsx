import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Dish {
  _id: string;
  nameHebrew: string;
  descriptionHebrew: string;
  price: number;
  imageUrl?: string;
  isAvailableToday: boolean;
}

const AdminDashboard: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [formData, setFormData] = useState({
    nameHebrew: '',
    descriptionHebrew: '',
    price: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'http://localhost:5001/api';

  // Fetch all dishes
  const fetchDishes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dishes`);
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newDish = {
        nameHebrew: formData.nameHebrew,
        descriptionHebrew: formData.descriptionHebrew,
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl || undefined
      };

      await axios.post(`${API_BASE_URL}/dishes`, newDish);
      
      // Reset form
      setFormData({
        nameHebrew: '',
        descriptionHebrew: '',
        price: '',
        imageUrl: ''
      });

      // Refresh dishes list
      fetchDishes();
    } catch (error) {
      console.error('Error creating dish:', error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle dish availability
  const toggleAvailability = async (dishId: string, currentStatus: boolean) => {
    try {
      await axios.put(`${API_BASE_URL}/dishes/${dishId}`, {
        isAvailableToday: !currentStatus
      });
      fetchDishes(); // Refresh the list
    } catch (error) {
      console.error('Error updating dish:', error);
    }
  };

  // Delete dish
  const deleteDish = async (dishId: string) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק מנה זו?')) {
      try {
        await axios.delete(`${API_BASE_URL}/dishes/${dishId}`);
        fetchDishes(); // Refresh the list
      } catch (error) {
        console.error('Error deleting dish:', error);
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        ניהול תפריט - Admin Dashboard
      </h1>

      {/* Add New Dish Form */}
      <div style={{ 
        border: '2px solid #ddd', 
        borderRadius: '10px', 
        padding: '20px', 
        marginBottom: '30px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2 style={{ marginBottom: '20px' }}>הוסף מנה חדשה</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              שם המנה:
            </label>
            <input
              type="text"
              name="nameHebrew"
              value={formData.nameHebrew}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              תיאור:
            </label>
            <input
              type="text"
              name="descriptionHebrew"
              value={formData.descriptionHebrew}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              מחיר:
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              קישור לתמונה (אופציונלי):
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'מוסיף...' : 'הוסף מנה'}
          </button>
        </form>
      </div>

      {/* Dishes List */}
      <div>
        <h2 style={{ marginBottom: '20px' }}>רשימת מנות</h2>
        {dishes.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>אין מנות זמינות</p>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {dishes.map((dish) => (
              <div
                key={dish._id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  backgroundColor: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>
                    {dish.nameHebrew}
                  </h3>
                  <p style={{ margin: '0 0 5px 0', color: '#666' }}>
                    {dish.descriptionHebrew}
                  </p>
                  <p style={{ margin: '0', fontWeight: 'bold', color: '#4CAF50' }}>
                    ₪{dish.price}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {/* Toggle Switch */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ fontSize: '14px' }}>זמין היום:</span>
                    <input
                      type="checkbox"
                      checked={dish.isAvailableToday}
                      onChange={() => toggleAvailability(dish._id, dish.isAvailableToday)}
                      style={{
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer'
                      }}
                    />
                  </label>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteDish(dish._id)}
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}
                  >
                    מחק
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
