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

const HomePage: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:5001/api';

  // Fetch all dishes
  const fetchDishes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dishes`);
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  // Filter dishes into two categories
  const availableDishes = dishes.filter(dish => dish.isAvailableToday);
  const comingSoonDishes = dishes.filter(dish => !dish.isAvailableToday);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        fontSize: '18px',
        color: '#666'
      }}>
        טוען מנות...
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '10px',
          color: '#333',
          fontWeight: 'bold'
        }}>
          הבישולים של עליזה
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#666',
          margin: '0'
        }}>
          אוכל ביתי טעים ואיכותי
        </p>
      </div>

      {/* Today's Dishes Section */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '30px',
          color: '#4CAF50',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          המנות של היום
        </h2>
        
        {availableDishes.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            color: '#666'
          }}>
            <p style={{ fontSize: '1.1rem', margin: '0' }}>
              אין מנות זמינות היום. בדוק שוב מאוחר יותר!
            </p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {availableDishes.map((dish) => (
              <DishCard key={dish._id} dish={dish} isAvailable={true} />
            ))}
          </div>
        )}
      </section>

      {/* Coming Soon Section */}
      <section>
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '30px',
          color: '#FF9800',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          בקרוב בתפריט
        </h2>
        
        {comingSoonDishes.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            color: '#666'
          }}>
            <p style={{ fontSize: '1.1rem', margin: '0' }}>
              אין מנות חדשות מתוכננות כרגע
            </p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {comingSoonDishes.map((dish) => (
              <DishCard key={dish._id} dish={dish} isAvailable={false} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

// Dish Card Component
interface DishCardProps {
  dish: Dish;
  isAvailable: boolean;
}

const DishCard: React.FC<DishCardProps> = ({ dish, isAvailable }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease-in-out',
      cursor: 'pointer',
      opacity: isAvailable ? 1 : 0.7
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }}
    >
      {/* Image */}
      {dish.imageUrl && (
        <div style={{
          height: '200px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <img
            src={dish.imageUrl}
            alt={dish.nameHebrew}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {!isAvailable && (
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'rgba(255, 152, 0, 0.9)',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '15px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              בקרוב
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <h3 style={{
          margin: '0 0 10px 0',
          fontSize: '1.3rem',
          color: '#333',
          fontWeight: 'bold'
        }}>
          {dish.nameHebrew}
        </h3>
        
        <p style={{
          margin: '0 0 15px 0',
          color: '#666',
          lineHeight: '1.5',
          fontSize: '0.95rem'
        }}>
          {dish.descriptionHebrew}
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: isAvailable ? '#4CAF50' : '#FF9800'
          }}>
            ₪{dish.price}
          </span>
          
          {isAvailable && (
            <span style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '5px 12px',
              borderRadius: '15px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              זמין היום
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
