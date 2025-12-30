import React, { useState, useEffect } from 'react';
import Card from '../components/Card'; // Pastikan path komponen benar
import './Sell.css';
import { Link } from 'react-router-dom';
import { Button } from 'pixel-retroui';

interface UserCard {
  card_user_id: number;
  card_id: number;
  card_name: string;
  image: string; 
  stars: number;
}

const Sell: React.FC = () => {
  const [userCards, setUserCards] = useState<UserCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
    
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const token = localStorage.getItem("access_token");

        console.log("token: ",token)
        
        const response = await fetch('http://127.0.0.1:5000/api/v1/profile', {
          method: 'GET',
          // mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        if (response.status === 301 || response.status === 302) {
          console.error("Server melakukan redirect. Cek endpoint URL di Flask!");
        }

        const result = await response.json();
        setUserCards(result.cards);
        setIsLoading(false);
      } catch (error) {
        console.error("CORS atau Network Error:", error);
        setIsLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (isLoading) return <div className="loading-text">Memuat Koleksi Kartu...</div>;

  return (
    <div className="sell-page-container">
      <div className="sell-page-header">
        <Link to="/menu">
          <Button
            bg="#fefcd0"
            textColor="black"
            borderColor="black"
            shadow="#c381b5"
          >
            KEMBALI
          </Button>
        </Link>
      </div>

      <div className="card-grid">
        {userCards.map((card) => (
          <Link 
            to="/set-price" 
            key={card.card_user_id} 
            state={{ cardInfo: card }} 
            style={{ textDecoration: 'none' }}
          >
            <Card 
              name={card.card_name} 
              image={`http://127.0.0.1:5000/${card.image}`} 
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sell;